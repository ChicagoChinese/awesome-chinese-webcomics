require('isomorphic-fetch')
const parse = require('csv-parse/lib/sync')
const fs = require('fs')

const files = [
  {
    name: 'awesome.csv',
    url: 'https://docs.google.com/spreadsheets/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv'
  },
  {
    name: 'bilingual.csv',
    url: 'https://docs.google.com/spreadsheets/u/1/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv&id=1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA&gid=1749138200'
  },
  {
    name: 'wuxia.csv',
    url: 'https://docs.google.com/spreadsheets/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv&id=1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA&gid=1663394683',
  }
]



function main() {
  for (const f of files) {
    fetchToFile(f.url, f.name)
  }
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

module.exports = { getComics }

if (require.main === module) {
  main()
}
