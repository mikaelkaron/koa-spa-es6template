// captures escape_char|${value}
const RE = /`|(?:\$\{\s*(\w+)\s*\})/g;

/**
 * Compiles string to ES template
 * @param {String} s Input string
 */
const compile = s =>
  Function(
    'map',
    `return \`${s.replace(RE, (e, v) => (v ? `\${map.${v}}` : `\\${e}`))}\``
  );

  module.exports = compile;