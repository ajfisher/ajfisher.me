const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

module.exports = ({markdownAST}, pluginOptions) => {

  visit(markdownAST, 'paragraph', (node, index) => {
    let bfound = false;
    let bindex = null;
    node.children.forEach((child, index) => {
      if (child.type == 'html' && child.value == '<b>') {
        bfound = true;
        bindex = index;
      }
    });

    if (bfound) {
      // console.log('----- THIS IS A P with a B in it ------');
      let pullquote = node.children[bindex+1].value;
      pullquote = pullquote[0].toUpperCase() + pullquote.substring(1);
      // if (pullquote.indexOf('"') >= 0) {
      pullquote = pullquote.replace(/"/g, '&quot;');
      // }
      const text = toString(node);
      // console.log(`>>>>> Upper cased: ${pullquote}`);
      // console.log(`>>>>> Node text: ${text}`);
      const html = `<p class="has-pullquote" data-pullquote="${pullquote}">${text}</p>`;
      // console.log(html);
      // console.log('------ Node before changes -------');
      // console.log(node);
      node.type = 'html';
      node.children = undefined;
      node.value = html;
      // console.log('------ Node after changes --------');
      // console.log(node);
    }
  });

  return markdownAST;
};
