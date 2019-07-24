const { readFileSync } = require('fs');
// captures escape_char|${value}
const RE = /`|(?:\$\{(.+)\})/g;

/**
 * Compiles string to ES template
 * @param {String} s Input string
 */
const compile = s =>
  Function(
    'map',
    `return \`${s.replace(RE, (e, v) => (v ? `\${map.${v}}` : `\\${e}`))}\``
  );

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
