import argparse
import hashlib
import json
import os
import re
import numpy as np

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

def compute_hash(file_content):
    return hashlib.sha256(file_content.encode()).hexdigest()

def remove_front_matter(text):
    return re.sub(r'^---.*?---\d*', '', text, flags=re.DOTALL)

def extract_tags(text):
    """Return list of tags from YAML front matter."""
    match = re.match(r'^---\n(.*?)\n---', text, re.DOTALL)
    if not match:
        return []
    front_matter = match.group(1)
    tag_match = re.search(r'^tags:\s*(.*)$', front_matter, re.MULTILINE)
    if not tag_match:
        return []
    tags_line = tag_match.group(1)
    return [t.strip() for t in tags_line.split(',') if t.strip()]

def remove_images_and_links(text):
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)  # Remove images
    text = re.sub(r'\[.*?\]\(.*?\)', '', text)   # Remove links
    text = re.sub(r'<p class=\"caption\">.*?</p>', '', text, flags=re.DOTALL) # remove captions
    return text

def chunk_and_encode(text, model, chunk_size=256, overlap_size=32):
    """Tokenise ``text`` with ``model.tokenizer`` and average the embeddings.
    The document is split into overlapping chunks of ``chunk_size`` tokens with
    a stride of ``chunk_size - overlap_size``. Each token chunk is decoded back
    to text before being encoded. The mean of the chunk embeddings represents
    the document.
    """

    token_ids = model.tokenizer.encode(text, add_special_tokens=False)
    token_chunks = [
        token_ids[i : i + chunk_size]
        for i in range(0, len(token_ids), chunk_size - overlap_size)
    ]
    chunks = [model.tokenizer.decode(chunk) for chunk in token_chunks]

    # now encode each of the chunks
    chunk_embeddings = model.encode(chunks)

    # average the chunk embeddings
    document_embedding = np.mean(chunk_embeddings, axis=0)
    return document_embedding

def file_to_slug(file):
    """
    Take the filename, remove the date off the front and the .md off the end
    and then return the resulting slug.
    """
    parts = file.split('-')[3:]
    slug_with_ext = '-'.join(parts)
    slug = slug_with_ext[:-3]
    return slug

def main():
    parser = argparse.ArgumentParser(description="Generate related post embeddings")
    parser.add_argument(
        "-i",
        "--input",
        default="../../src/content/posts",
        help="Directory containing markdown posts",
    )
    parser.add_argument(
        "-o",
        "--output",
        default="similarity_data.json",
        help="Path to write JSON similarity data",
    )
    parser.add_argument(
        "--chunk-size",
        type=int,
        default=256,
        help="Token chunk size for embeddings",
    )
    parser.add_argument(
        "--overlap-size",
        type=int,
        default=32,
        help="Token overlap between chunks",
    )
    parser.add_argument(
        "--related-count",
        type=int,
        default=10,
        help="Number of related posts to keep",
    )
    parser.add_argument(
        "--tag-weight",
        type=float,
        default=0.1,
        help="Weight applied to tag similarity",
    )
    parser.add_argument(
        "--overlap-bonus",
        type=float,
        default=0.05,
        help="Bonus per overlapping tag",
    )

    args = parser.parse_args()

    md_path = args.input

    # Load embeddings cache if it exists
    cache_file = 'embeddings_cache.json'
    if os.path.exists(cache_file):
        with open(cache_file, 'r', encoding='utf-8') as f:
            embeddings_cache = json.load(f)
    else:
        embeddings_cache = {}


    # build the embeddings from the documents.
    # Using the all MiniLM model as it seems to produce a good balance of size
    # and embedding complexity so that we get some decent similarity scoring.
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    embeddings_list = []

    for f in [f for f in os.listdir(md_path) if f.endswith('.md')]:
        file_path = os.path.join(md_path, f)
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        current_hash = compute_hash(content)
        tags = extract_tags(content)

        # Check cache to see if embedding exists and matches current hash
        if f in embeddings_cache and embeddings_cache[f]['hash'] == current_hash:
            embedding = np.array(embeddings_cache[f]['embedding'])
            tag_embedding = np.array(embeddings_cache[f].get('tag_embedding', []))
        else:
            text = remove_images_and_links(remove_front_matter(content))
            text_with_tags = text + "\n" + " ".join(tags)
            embedding = chunk_and_encode(text_with_tags, model, args.chunk_size, args.overlap_size)
            tag_embedding = chunk_and_encode(" ".join(tags), model, args.chunk_size, args.overlap_size)
            embeddings_cache[f] = {
                'hash': current_hash,
                'embedding': embedding.tolist(),
                'tag_embedding': tag_embedding.tolist(),
                'tags': tags,
            }

        embeddings_list.append({
            'file': f,
            'embedding': embedding,
            'tag_embedding': tag_embedding,
            'tags': tags,
            'hash': current_hash
        })
    # embeddings_list populated above via cache-aware loop

    # Now we make the similarity matrix between each document.

    # Create arrays where each row is an embedding
    embeddings_array = np.array([item['embedding'] for item in embeddings_list])
    tag_embeddings_array = np.array([item['tag_embedding'] for item in embeddings_list])

    print(f"tag_embeddings_array shape: {tag_embeddings_array.shape}")
    print(f"embeddings_array shape: {embeddings_array.shape}")
    # Compute the cosine similarity matrix for content and tags
    similarity_matrix = cosine_similarity(embeddings_array, embeddings_array)
    tag_similarity_matrix = cosine_similarity(tag_embeddings_array, tag_embeddings_array)

    # Initialize an empty list to hold the data
    data = []

    # Iterate through each row of the similarity matrix
    for i, row in enumerate(similarity_matrix):
        # Get the file name, tags and hash for the current document
        current_file = embeddings_list[i]['file']
        current_hash = embeddings_list[i]['hash']
        current_tags = embeddings_list[i]['tags']

        # Initialize an empty list to hold the similarity info for this document
        post_similarity = []

        # Iterate through each column of the similarity matrix
        for j, similarity_score in enumerate(row):
            # Skip the diagonal (self-similarity) elements
            if i != j:
                related_file = embeddings_list[j]['file']
                related_tags = embeddings_list[j]['tags']
                overlap = len(set(current_tags) & set(related_tags))
                tag_sim = float(tag_similarity_matrix[i][j])
                score = float(similarity_score) + args.tag_weight * tag_sim + args.overlap_bonus * overlap
                post_similarity.append({
                    'file': related_file,
                    'slug': file_to_slug(related_file),
                    'similarity': score
                })

        # Sort the post_similarity list by similarity score in descending order
        post_similarity = sorted(post_similarity, key=lambda x: x['similarity'], reverse=True)

        # Create a dictionary for the current document and add it to the data list
        data.append({
            'file': current_file,
            'slug': file_to_slug(current_file),
            'hash': current_hash,
            'post_similarity': post_similarity[0:args.related_count]
        })

    # Save the data to a JSON file
    with open(args.output, 'w') as f:
        json.dump(data, f, indent=4)

    # Save updated embeddings cache
    with open(cache_file, 'w') as f:
        json.dump(embeddings_cache, f, indent=2)

if __name__ == '__main__':
    main()

