require('isomorphic-fetch')
const parse = require('csv-parse/lib/sync')
const fs = require('fs')

const awesomeFile = 'awesome.csv'
const awesomeUrl = 'https://docs.google.com/spreadsheets/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv'

const bilingualFile = 'bilingual.csv'
const bilingualUrl = 'https://docs.google.com/spreadsheets/u/1/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv&id=1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA&gid=1749138200'

function main() {
  fetchToFile(awesomeUrl, awesomeFile)
  fetchToFile(bilingualUrl, bilingualFile)
}

function fetchToFile(url, filename) {
  fetch(url)
    .then(response => response.text())
    .then(text => {
      fetchComics(text, filename)
    })
}

function fetchComics(text, filename) {
  let origText = fs.existsSync(filename) ?
    fs.readFileSync(filename, 'utf8') : ''
  if (text === origText) {
    return
  }
  console.log(`Detected changes, updating ${filename}`);
  fs.writeFileSync(filename, text, 'utf8')
}

function getComics(csvFile) {
  let text = fs.readFileSync(csvFile, 'utf8')
  let lines = text.split('\n')
  lines[0] = lines[0].toLowerCase().replace(/ /g, '_')
  let comics = parse(lines.join('\n'), { columns: true })
  comics.forEach(comic => {
    comic.genres =
      comic.genres
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== "")
  })

  let lastUpdated = fs.statSync(csvFile).mtime.toLocaleDateString()

  let genres = new Set(comics.map(c => c.genres).flat())
  genres = Array.from(genres)
  genres.sort()

  return { comics, lastUpdated, genres }
}

function getAwesomeComics() {
  return getComics(awesomeFile)
}

function getBilingualComics() {
  return getComics(bilingualFile)
}

module.exports = { getComics }

if (require.main === module) {
  main()
}
