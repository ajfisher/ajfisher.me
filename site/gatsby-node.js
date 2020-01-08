const path = require(`path`);
const {fmImagesToRelative} = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node }) => {
  // this is to try and resolve the issues with the pathing
  // if (node.sourceInstanceName === 'content') {
    // console.log(node.relativePath);
  // }
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
              date(formatString: "YYYY/MM/DD")
              layout
              featureimage
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    // TODO add the listimage in here as well.
    let featuredImage = node.frontmatter.featureimage;

		if (featuredImage != '' && featuredImage != null) {
			if (featuredImage.indexOf('/img/posts/') == 0) {
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
        path: node.frontmatter.slug,
        component: path.resolve(`src/templates/post.js`),
        context
      });
    } else {
      // console.log(node.frontmatter.date + '/' + node.frontmatter.slug);
      createPage({
        path: node.frontmatter.date + '/' + node.frontmatter.slug,
        component: path.resolve(`src/templates/post.js`),
        context
      });
    }
  });
}
