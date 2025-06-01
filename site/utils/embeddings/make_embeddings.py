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

def remove_images_and_links(text):
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)  # Remove images
    text = re.sub(r'\[.*?\]\(.*?\)', '', text)   # Remove links
    text = re.sub(r'<p class=\"caption\">.*?</p>', '', text, flags=re.DOTALL) # remove captions
    return text

def preprocess_markdown_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    text = remove_front_matter(text)
    text = remove_images_and_links(text)
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

    # tokens = text.split()
    # chunks = [' '.join(tokens[i:i + chunk_size]) for i in range(0, len(tokens), chunk_size - overlap_size)]

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

    args = parser.parse_args()

    md_path = args.input

    processed_texts_hashes = [
        {
            "file": f,
            "text": preprocess_markdown_file(os.path.join(md_path, f)),
            "hash": compute_hash(
                open(os.path.join(md_path, f), "r", encoding="utf-8").read()
            ),
        }
        for f in os.listdir(md_path)
        if f.endswith(".md")
    ]


    # build the embeddings from the documents.
    # Using the all MiniLM model as it seems to produce a good balance of size
    # and embedding complexity so that we get some decent similarity scoring.
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    embeddings_list = [
        {
            'file': item['file'],
            'embedding': chunk_and_encode(
                item['text'],
                model,
                chunk_size=args.chunk_size,
                overlap_size=args.overlap_size,
            ),
            'hash': item['hash'],
        }
        for item in processed_texts_hashes
    ]

    # Now we make the similarity matrix between each document.

    # Create an array where each row is an embedding
    embeddings_array = np.array([item['embedding'] for item in embeddings_list])

    # Compute the cosine similarity matrix
    similarity_matrix = cosine_similarity(embeddings_array, embeddings_array)

    # Initialize an empty list to hold the data
    data = []

    # Iterate through each row of the similarity matrix
    for i, row in enumerate(similarity_matrix):
        # Get the file name and hash for the current document
        current_file = embeddings_list[i]['file']
        current_hash = embeddings_list[i]['hash']

        # Initialize an empty list to hold the similarity info for this document
        post_similarity = []

        # Iterate through each column of the similarity matrix
        for j, similarity_score in enumerate(row):
            # Skip the diagonal (self-similarity) elements
            if i != j:
                related_file = embeddings_list[j]['file']
                post_similarity.append({
                    'file': related_file,
                    'slug': file_to_slug(related_file),
                    'similarity': float(similarity_score)
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


if __name__ == '__main__':
    main()

