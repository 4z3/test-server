#! /usr/bin/env node

port = Number(process.argv[2]);
if (isNaN(port)) {
  // You are made of stupid!
  console.error('usage: test-server port');
  process.exit(23);
} else require('http').createServer(function (req, res) {
  try {
    var uri = require('url').parse(req.url, true);
    var path = uri.pathname.split('/').slice(1);

    var path = uri.pathname.split('/');

    var statusCode = Number(path[1]);
    var reasonPhrase = path.length > 2 && path.slice(2).join(' ');
    var headers = uri.query;

    var content;
    [ 'content', 'Content' ].forEach(function (key) {
      if (key in headers) {
        content = headers[key];
        delete headers[key];
      };
    });

    console.log(JSON.stringify({
      date: new Date,
      req: { uri: uri },
      res: {
        statusCode: statusCode,
        reasonPhrase: reasonPhrase,
        headers: headers,
        Content: content
      }
    }, null, 2));

    res.writeHead(statusCode, reasonPhrase, headers);
    res.end(content);
  } catch (exn) {
    console.error(exn.stack.toString());
  };
}).listen(port, function () {
  console.log('// test-server running at http://0.0.0.0:' + port);
});
