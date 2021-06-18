// eslint-disable-next-line global-require
require('newrelic');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const Mustache = require('mustache');
const path = require('path');

const app = express();
const PORT = 3000;

function loadIndexWithEnv(indexPath = '') {
  const index = fs.readFileSync(indexPath, 'utf-8');

  return Mustache.render(index, {
    titleURL: process.env.TITLE_URL || 'http://localhost:3001/bundle.js',
    aboutURL: process.env.ABOUT_URL || 'http://localhost:3002/bundle.js',
    reviewURL: process.env.REVIEWS_URL || 'http://localhost:3007/bundle.js',
  });
}

function getLoaderIOFile() {
  const loaderFiles = fs.readdirSync(path.resolve(__dirname)).filter((filename) => filename.endsWith('.txt'));

  return loaderFiles[0];
}

const indexPath = path.resolve(__dirname, '..', 'public', 'index.html');

const indexHTML = loadIndexWithEnv(indexPath);

app.use(express.json());

app.get('/', (req, res) => {
  res.send(indexHTML);
});

app.get('/loaderio-:id', (req, res) => {
  const filename = getLoaderIOFile();

  res.sendFile(path.resolve(__dirname, filename));
});

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.send(indexHTML);
});

app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});
