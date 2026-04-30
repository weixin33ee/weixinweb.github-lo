const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/烤肉/WorkBuddy/20260430094632/oc-world';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
};

const MIME = (ext) => TYPES[ext] || 'text/plain; charset=utf-8';

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  const fp = path.join(ROOT, p);
  const ext = path.extname(fp).toLowerCase();

  // Security: only serve files under ROOT
  if (!fp.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 — File Not Found</h1><p>The file you requested does not exist in the UBB system.</p>');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME(ext) });
    res.end(data);
  });
});

server.listen(3721, () => {
  console.log('UBB Server running at http://localhost:3721');
  console.log('Root:', ROOT);
});
