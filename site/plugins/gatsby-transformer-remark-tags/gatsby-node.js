
// takes a node, loads it all up and then tries to fix the frontmatter tags

const matter = require('gray-matter');

exports.onCreateNode = async ({ node, actions, loadNodeContent }) => {

  const { createNodeField } = actions;
  if (node.internal.type !== `MarkdownRemark`) {
    return;
  }

  // don't need to do anything if there are no tags.
  if (typeof(node.frontmatter.tags) === 'undefined') {
    return;
  }

  const tags = node.frontmatter.tags.split(',').map(item => {
    return item.trim();
  });

  createNodeField({
    node,
    name: `taglist`,
    value: tags
  });
};
