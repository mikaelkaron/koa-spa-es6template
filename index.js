const { readFileSync } = require('fs');
const compile = require('./compile');

/**
 * Middleware for es6 templating
 * @param {String} path Path to template
 * @param {*} data Data to pass to templating
 */
const spa = (path, data) => {
  // compile contents of path into ES template
  const body = compile(readFileSync(path).toString());
  // return middleware that sets body to result
  return async ctx => {
    ctx.body = body(data);
  };
};

module.exports = spa;
