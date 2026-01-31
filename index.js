const express = require('express');
const app = express();

function gcd(a, b) {
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function parseNatural(value) {
  if (typeof value !== 'string') return null;

  // remove optional braces
  if (value.startsWith('{') && value.endsWith('}')) {
    value = value.slice(1, -1);
  }

  // must be digits only
  if (!/^\d+$/.test(value)) return null;

  return BigInt(value);
}

app.get('/aminov_bun_gmail_com', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/plain');

  const x = parseNatural(req.query.x);
  const y = parseNatural(req.query.y);

  if (x === null || y === null) {
    res.end('NaN');
    return;
  }

  if (x === 0n || y === 0n) {
    res.end('0');
    return;
  }

  const result = (x * y) / gcd(x, y);
  res.end(result.toString());
});

app.listen(process.env.PORT || 3000);