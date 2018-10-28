module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
  'test/**/*.test.js': ['test', 'git add'],
};
