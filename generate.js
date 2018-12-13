require('isomorphic-fetch')
const parse = require('csv-parse/lib/sync')
const fs = require('fs')
require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"],
})
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const App = require('./src/App.jsx')

const csvFile = 'webcomics.csv'
const url = 'https://docs.google.com/spreadsheets/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv'

function main() {
  fetch(url)
  .then(response => response.text())
  .then(text => {
    let comics = getComics(text)
    let elem = React.createElement(App, {comics}, null)
    let content = ReactDOMServer.renderToString(elem)
    let html = getHtml(content)
    fs.writeFileSync('index.html', html, 'utf8')
  })
}

function getComics(text) {
  let origText = fs.existsSync(csvFile) ?
    fs.readFileSync(csvFile, 'utf8') : ''
  if (text === origText) {
    return csvToComics(text)
  }
  console.log('Detected changes, updating...');
  fs.writeFileSync(csvFile, text, 'utf8')
  return csvToComics(text)
}

function csvToComics(text) {
  let lines = text.split('\n')
  lines[0] = lines[0].toLowerCase().replace(/ /g, '_')
  return parse(lines.join('\n'), {columns: true})
}

function getHtml(content) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Awesome Chinese Webcomics</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
  <style>
  td, th {
    border: 1px solid gray;
    padding: 1rem;
  }
  </style>
</head>
<body>
  <div id="index">${content}</div>
  <script src="./src/Index.js"></script>
</body>
</html>
  `
}

main()
