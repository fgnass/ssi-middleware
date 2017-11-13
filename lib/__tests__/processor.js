const processor = require('../processor');

const ssi = processor({
  file: path => `file:${path}`,
  virtual: path => `virtual:${path}`
});

function spec(name, html) {
  test(name, () => {
    return ssi(html).then(res => expect(res).toMatchSnapshot());
  });
}

spec('file', '<html><!--#include file="/path"--></html>');
spec('virtual', '<html><!--#include virtual="/path"--></html>');
