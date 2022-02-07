const htmlPdf = require('html-pdf-chrome');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const express = require('express');

const app = express();

(async () => {
chrome = await chromeLauncher.launch({
        chromeFlags: [
          '--disable-gpu',
          '--headless',
        ],
        // uncomment if using Chrome Beta
        // chromePath: '/usr/bin/google-chrome-beta',
        connectionPollInterval: 250,
        logLevel: 'error',
        maxConnectionRetries: 50,
      });
console.log(chrome.port)
// const html = '<p>Hello, world!</p>';
const html = fs.readFileSync('./test/index.html', 'utf8');
console.log(html)
const options = {
  port: chrome.port, // port Chrome is listening on
};

htmlPdf.create(html, options).then((pdf) => pdf.toFile('test.pdf'));
htmlPdf.create(html, options).then((pdf) => pdf.toBase64());
htmlPdf.create(html, options).then((pdf) => pdf.toBuffer());
htmlPdf.create(html, options).then((pdf) => pdf.toStream());

setTimeout(() => process.exit(0), 1000)
})()
