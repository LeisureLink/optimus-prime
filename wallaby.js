'use strict';

module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*',
      'test/**/*',
      { pattern: 'test/**/*.test.js', ignore: true }
    ],
    tests: [
      'test/**/*.test.js'
    ],
    delays: {
      edit: 500,
      run: 150
    },
    env: {
      type: 'node'
    },
    workers: {
      recycle: true,
      initial: 1,
      regular: 1
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  };
};
