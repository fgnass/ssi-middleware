const path = require('path');
const express = require('express');
const ssi = require('../middleware');

const request = require('request-promise-native');

let server;
let baseUrl;

const baseDir = path.resolve(__dirname, 'fixture');
const app = express();

beforeAll(
  () =>
    new Promise(resolve => {
      server = app.listen(0, () => {
        const { port } = server.address();
        baseUrl = `http://localhost:${port}`;

        app.use(
          ssi({
            baseDir,
            baseUrl
          })
        );
        app.get('/dynamic', (req, res) => {
          res.end('DYNAMIC CONTENT');
        });
        app.use(express.static(baseDir));

        resolve();
      });
    })
);

afterAll(() => {
  server.close();
});

test('middleware', () => {
  return request(`${baseUrl}`).then(body => {
    expect(body).toMatchSnapshot();
  });
});
