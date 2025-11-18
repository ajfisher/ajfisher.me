module.exports = {
  transform: {
    "^.+\\.[cm]?js$": "<rootDir>/tests/utils/jest-preprocess.js",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/tests/__mocks__/file-mock.js`,
    "^humanize-plus$": "<rootDir>/tests/__mocks__/humanize-plus.js",
    "^moment$": "<rootDir>/tests/__mocks__/moment.js",
    "^@fortawesome/react-fontawesome$": "<rootDir>/tests/__mocks__/@fortawesome/react-fontawesome.js"
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testEnvironment: `jsdom`,
  setupFiles: [`<rootDir>/tests/utils/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/tests/utils/setup-test-env.js"],
};
