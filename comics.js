require('isomorphic-fetch')
const parse = require('csv-parse/lib/sync')
const fs = require('fs')

const csvFile = 'webcomics.csv'
const url = 'https://docs.google.com/spreadsheets/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv'

function main() {
  fetch(url)
  .then(response => response.text())
  .then(text => {
    fetchComics(text)
    console.log(getComics())
  })
}

function fetchComics(text) {
  let origText = fs.existsSync(csvFile) ?
    fs.readFileSync(csvFile, 'utf8') : ''
  if (text === origText) {
    return
  }
  console.log('Detected changes, updating...');
  fs.writeFileSync(csvFile, text, 'utf8')
}

function getComics() {
  let text = fs.readFileSync(csvFile, 'utf8')
  let lines = text.split('\n')
  lines[0] = lines[0].toLowerCase().replace(/ /g, '_')
  let comics = parse(lines.join('\n'), {columns: true})
  comics.forEach(comic => {
    comic.genres = comic.genres.split(',').map(s => s.trim())
  })
  return comics
}

module.exports = {getComics}

if (require.main === module) {
  main()
}
