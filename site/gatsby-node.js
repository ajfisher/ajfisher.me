const path = require(`path`);
const { kebabCase, pathDate } = require('./lib/utils');

exports.onCreateNode = ({ _node }) => {
  // this is to try and resolve the issues with the pathing
};

exports.createSchemaCustomization = ({ actions, _schema }) => {
  const { createTypes } = actions;
  // create foreignkey link from the markdown node to pick up the
  // similarity items that come from the related posts. Also then traverse the
  // posts in the similarity list and create a link back to the markdown document
  // so we can grab things like excerpts, links, list images etc when we want
  // to render the related items out.
  const typeDefs = `
    type MarkdownRemark implements Node {
      related: SimilarityDataJson @link(by: "slug", from: "frontmatter.slug")
    }
    type SimilarityDataJson implements Node {
      post_similarity: [PostSimilarity]
    }
    type PostSimilarity {
      post: MarkdownRemark @link(by: "frontmatter.slug", from: "slug")
    }
  `;
  createTypes(typeDefs);
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
							slug
              date(formatString: "YYYY-MM-DD")
              layout
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark {
        group(field: {fields: {taglist: SELECT}}) {
          fieldValue
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }

  let postCount = 0; // how many posts do we end up with.

  // build out the pages for pages and posts
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {

    const context = {
      slug: node.frontmatter.slug,
    };

    if (node.frontmatter.layout.startsWith('page')) {
      createPage({
        path: node.frontmatter.slug + '/',
        component: path.resolve(`src/templates/article.js`),
        context
      });
    } else if (node.frontmatter.layout.startsWith('post')) {
      postCount = postCount + 1;
      createPage({
        path: pathDate(node.frontmatter.date) + '/' + node.frontmatter.slug + '/',
        component: path.resolve(`src/templates/post.js`),
        context
      });
    }
  });

  // now build out a page for each of the tags
  const tags = result.data.tagsGroup.group;
  tags.forEach(tag => {
    createPage({
      path: `/tagged/${kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`src/templates/tags.js`),
      context: {
        tag: tag.fieldValue
      }
    });
  });

  // now build out a page for each paginated page of the blog list
  const postsPerPage = 11;
  const numPostPages = Math.ceil(postCount / postsPerPage);
  for (let i = 0; i < numPostPages; i++) {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve(`src/templates/post-list.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPostPages,
        currentPage: i + 1,
      }
    });
  }
}
