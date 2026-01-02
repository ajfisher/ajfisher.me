import { visit } from 'unist-util-visit';

export default function remarkPullQuotes() {
  return (tree) => {
    visit(tree, 'paragraph', (node) => {
      // 1. Find the <b> tag to trigger the logic
      const bIndex = node.children.findIndex(
        (child) => child.type === 'html' && child.value === '<b>'
      );

      if (bIndex !== -1) {
        // 2. Extract the text for the pullquote attribute
        // In the AST, the text is the node immediately following the <b> tag
        let pullquote = node.children[bIndex + 1]?.value || '';

        if (pullquote) {
          // Capitalization and escaping to match legacy logic
          pullquote = pullquote[0].toUpperCase() + pullquote.substring(1);
          pullquote = pullquote.replace(/"/g, '&quot;');

          // 3. Update the paragraph node properties
          // We don't touch node.children here, so the <b> tags remain intact
          node.data = {
            hName: 'p',
            hProperties: {
              className: ['has-pullquote'],
              'data-pullquote': pullquote,
            },
          };
        }
      }
    });
  };
}
