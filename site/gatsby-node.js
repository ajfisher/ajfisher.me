const path = require(`path`);
const { kebabCase, pathDate } = require('./lib/utils');

exports.onCreateNode = ({ node }) => {
  // this is to try and resolve the issues with the pathing
};

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
              featureimage
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
    // TODO add the listimage in here as well.
    let featuredImage = node.frontmatter.featureimage;

		if (featuredImage !== '' && featuredImage !== null) {
			if (featuredImage.indexOf('/img/posts/') === 0) {
				// we need to pull this off the front of the url
				featuredImage = featuredImage.substring(11);
			}
		}
    const context = {
      slug: node.frontmatter.slug,
      featuredImage
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
