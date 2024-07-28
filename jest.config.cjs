// // jest.config.cjs
// module.exports = {
//   transform: {
//     '^.+\\.js$': 'babel-jest',
//   },
//   testEnvironment: 'node',
//   transformIgnorePatterns: ['<rootDir>/node_modules/'],
// };


module.exports = {
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
};
