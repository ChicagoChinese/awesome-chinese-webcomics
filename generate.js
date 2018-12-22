const fs = require('fs')
const { getComics } = require('./comics')
require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"],
})
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const App = require('./src/App.js')
const nunjucks = require('nunjucks')

function main() {
  let data = getComics()
  let { comics, genres, lastUpdated } = data

  let elem = React.createElement(App, { comics, genres, lastUpdated }, null)
  let content = ReactDOMServer.renderToString(elem)
  let html = getHtml(content, data)
  fs.writeFileSync('index.html', html, 'utf8')
  console.log('Generated index.html')

  nunjucks.configure('.', {autoescape: false})
  html = nunjucks.render('README_template.md', {
    comics: comics.map(addLinks)
  })
  fs.writeFileSync('README.md', html, 'utf8')
  console.log('Generated README.md')
}

function addLinks(comic) {
  comic.links =
    [
      comic.simplified_link ? `[simplified]($comic.simplified_link)` : '',
      comic.traditional_link ? `[traditional]($comic.traditional_link)` : '',
    ]
    .filter(s => s !== '')
    .join(', ')
  return comic
}

function getHtml(content, data) {
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
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(data)};
  </script>
  <script src="./src/index.js"></script>
</body>
</html>
  `
}

main()
