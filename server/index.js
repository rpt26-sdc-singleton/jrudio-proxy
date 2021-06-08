// eslint-disable-next-line global-require
require('newrelic');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-line global-require
  require('dotenv').config();
}

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});
