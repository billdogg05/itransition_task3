const express = require('express');
const app = express();

function gcd(a, b) {
  while (b !== 0) {
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

  if (!/^\{\d+\}$/.test(xRaw) || !/^\{\d+\}$/.test(yRaw)) {
    res.send('NaN');
    return;
  }

  const x = Number(xRaw.slice(1, -1));
  const y = Number(yRaw.slice(1, -1));

  res.send(String(lcm(x, y)));
});

app.listen(process.env.PORT || 3000);