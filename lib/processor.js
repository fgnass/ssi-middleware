const path = require('path');
const url = require('url');
const replace = require('string-replace-async');

const pattern = /<!--\s*#include\s+(.+?)-->/g;
const attrPattern = /(file|virtual)\s*=\s*(['"])(.+?)\2/;

module.exports = (handlers, { baseDir = '', baseUrl = '' } = {}) => {
  // resolve paths depending on their type
  const resolver = {
    file: p => path.join(baseDir, p),
    virtual: p => url.resolve(baseUrl, p)
  };

  const replacer = (match, attrs) => {
    const [, type, , path] = attrPattern.exec(attrs) || [];
    if (!type) throw new Error('type must be "file" or "virtual"');

    const handler = handlers[type];
    if (!handler) throw new Error(`no handler for type ${type}`);

    const resolve = resolver[type];
    return Promise.resolve(handler(resolve(path)));
  };

  return body => replace(body, pattern, replacer);
};
