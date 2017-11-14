# Express middleware to render Server Side Includes

[![Build Status](https://travis-ci.org/fgnass/ssi-middleware.svg?branch=master)](https://travis-ci.org/fgnass/ssi-middleware)

Express-style middleware to process SSI directives.

The only command currentl implemented is `#include` which supports both static files and _virtual_ paths which are fetched via HTTP(S).

```html
<html>
  <!--#include file="/static.txt"-->
  <!--#include virtual="/dynamic"-->
</html>
```

## Usage

See the basic usage example below. In order to resolve static files the `baseDir` option has to be provided, respectively `baseUrl` to resolve virtual paths.

```js
  const express = require('express');
  const ssi = require('ssi-middleware');

  const app = express();
  const port = 3000;

  app.use(ssi({
    baseDir: `${__dirname}/public`,
    baseUrl: `http://localhost:${port}`,
    request: {
      // See https://npmjs.com/package/request for options.
      // This enables the use of self-signed certificates:
      strictSSL: false
    }
  }));

  app.listen(port);
```

# License

MIT
