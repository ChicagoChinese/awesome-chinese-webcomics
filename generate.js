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
  let data = getComics('awesome.csv')
  let { comics, genres, lastUpdated } = data

  // let elem = React.createElement(App, { comics, genres, lastUpdated }, null)
  // let content = ReactDOMServer.renderToString(elem)
  // let html = getHtml(content, data)
  // fs.writeFileSync('index.html', html, 'utf8')
  // console.log('Generated index.html')

  nunjucks.configure('templates', { autoescape: false })
  let html = nunjucks.render('README_template.md', {
    groups: groupByDifficulty(comics.map(addLinks))
  })
  fs.writeFileSync('README.md', html)
  console.log('Generated README.md')

  for (let theme of ['wuxia']) {
    let data = getComics(theme + '.csv')
    let { comics } = data
    let html = nunjucks.render('theme_template.md', { title: capitalize(theme), comics: comics.map(addLinks) })
    let outputFile = theme + '.md'
    fs.writeFileSync(outputFile, html)
    console.log(`Generated ${outputFile}`)
  }
}

function groupByDifficulty(comics) {
  return ['beginner', 'intermediate', 'advanced', 'expert'].map(difficulty => {
    let name = capitalize(difficulty)
    let items = comics.filter(c => c.difficulty === difficulty)
    return [name, items]
  })
}

function addLinks(comic) {
  comic.links =
    [
      comic.simplified_link ? `[simplified](${comic.simplified_link})` : '',
      comic.traditional_link ? `[traditional](${comic.traditional_link})` : '',
      comic.english_link ? `[english](${comic.english_link})` : '',
    ]
      .filter(s => s !== '')
      .join(', ')
  return comic
}

function getHtml(content, data) {
  data = JSON.stringify(data)
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Awesome Chinese Webcomics</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
    window.__INITIAL_STATE__ = ${data};
  </script>
  <script src="./src/index.js"></script>
</body>
</html>
  `
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

main()
