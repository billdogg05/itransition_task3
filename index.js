const express = require('express');
const app = express();

function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

app.get('/aminov_bun_gmail_com', (req, res) => {
  const xRaw = req.query.x;
  const yRaw = req.query.y;

  if (typeof xRaw !== 'string' || typeof yRaw !== 'string' || !/^\{[1-9]\d*\}$/.test(xRaw) || !/^\{[1-9]\d*\}$/.test(yRaw)) {
    res.send('NaN');
    return;
  }

  try {
    const x = BigInt(xRaw.slice(1, -1));
    const y = BigInt(yRaw.slice(1, -1));

    res.send(lcm(x, y).toString());
  } catch {
    res.send('NaN');
  }
});

app.listen(process.env.PORT || 3000);