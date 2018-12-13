require('isomorphic-fetch')
const parse = require('csv-parse/lib/sync')

const url = 'https://docs.google.com/spreadsheets/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/export?format=csv'

fetch(url)
.then(response => response.text())
.then(text => {
  let lines = text.split('\n')
  lines[0] = lines[0].toLowerCase().replace(/ /g, '_')
  let rows = parse(lines.join('\n'), {columns: true})
  console.log(rows);
})
