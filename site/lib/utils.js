
exports.kebabCase = (str) => {
  // this takes a spaced bit of text and effectively kebab cases it
  return (str.replace(' ', '-').toLowerCase());
};
