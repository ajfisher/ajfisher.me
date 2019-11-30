const path = require(`path`);

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
		console.log(node.frontmatter.slug);
    // TODO fix this to use a date form.
    //
    const context = {
      slug: node.frontmatter.slug
    };

    if (node.frontmatter.layout.startsWith('page')) {
      createPage({
        path: node.frontmatter.slug,
        component: path.resolve(`src/templates/post.js`),
        context
      });
    } else {
      console.log(node.frontmatter.date + '/' + node.frontmatter.slug);
      createPage({
        path: node.frontmatter.date + '/' + node.frontmatter.slug,
        component: path.resolve(`src/templates/post.js`),
        context
      });
    }
  });
}
