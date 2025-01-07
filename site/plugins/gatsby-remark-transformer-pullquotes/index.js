// note that need to pin these at V2 because they are ESM after that
// and Gatsby doesn't support it.
const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

module.exports = ({markdownAST}, _pluginOptions) => {

  visit(markdownAST, 'paragraph', (node, _index) => {
    let bfound = false;
    let bindex = null;
    node.children.forEach((child, index) => {
      if (child.type === 'html' && child.value === '<b>') {
        bfound = true;
        bindex = index;
      }
    });

    if (bfound) {
      let pullquote = node.children[bindex+1].value;
      pullquote = pullquote[0].toUpperCase() + pullquote.substring(1);
      pullquote = pullquote.replace(/"/g, '&quot;');

      const text = toString(node);
      const html = `<p class="has-pullquote" data-pullquote="${pullquote}">${text}</p>`;

      node.type = 'html';
      node.children = undefined;
      node.value = html;
    }
  });

  return markdownAST;
};
