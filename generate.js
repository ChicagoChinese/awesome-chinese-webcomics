const fs = require('fs')
const {getComics} = require('./comics')
require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"],
})
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const App = require('./src/App.js')

function main() {
  let comics = getComics()
  let elem = React.createElement(App, {comics}, null)
  let content = ReactDOMServer.renderToString(elem)
  let html = getHtml(content)
  fs.writeFileSync('index.html', html, 'utf8')
  console.log('Generated index.html')
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
  <script src="./src/index.js"></script>
</body>
</html>
  `
}

main()
