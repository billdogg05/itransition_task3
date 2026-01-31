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

app.get('/aminov_bun_gmail_com', (req, res) => {
  const xRaw = req.query.x;
  const yRaw = req.query.y;

  // только строки вида {123}
  if (
    typeof xRaw !== 'string' ||
    typeof yRaw !== 'string' ||
    !/^\{[1-9]\d*\}$/.test(xRaw) ||
    !/^\{[1-9]\d*\}$/.test(yRaw)
  ) {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    res.end('NaN');
    return;
  }

  const x = BigInt(xRaw.slice(1, -1));
  const y = BigInt(yRaw.slice(1, -1));

  const result = (x * y) / gcd(x, y);

  res.status(200);
  res.setHeader('Content-Type', 'text/plain');
  res.end(result.toString());
});

app.listen(process.env.PORT || 3000);