const treeHasCodeBlock = (node) => {
  if (!node) {
    return false;
  }

  if (node.type === 'code') {
    return true;
  }

  return Array.isArray(node.children)
    && node.children.some(treeHasCodeBlock);
};

export default function remarkCodeBlocks() {
  return (tree, file) => {
    if (!treeHasCodeBlock(tree) || !file?.data) {
      return;
    }

    file.data.astro = file.data.astro ?? {};
    file.data.astro.frontmatter = file.data.astro.frontmatter ?? {};
    file.data.astro.frontmatter.hasCodeBlocks = true;
  };
}
