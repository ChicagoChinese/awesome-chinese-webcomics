// Generate HTML to copy and paste into chinese-forums.com
const fs = require('fs')
const { getBilingualComics, getAwesomeComics } = require('./comics')
const nunjucks = require('nunjucks')

function main() {
  nunjucks.configure('templates')

  generateHtml(getBilingualComics().comics, 'bilingual-forum.html')
  generateHtml(getAwesomeComics().comics, 'awesome-forum.html')
}

function generateHtml(comics, filename) {
  html = nunjucks.render('forum.html', {comics: addFields(comics)})
  fs.writeFileSync(filename, html, 'utf8')
  console.log(`Generated ${filename}`)
}

function addFields(comics) {
  comics.map(comic => {
    comic.titles = [
      comic.title,
      comic.english_title,
      comic.simplified_title,
      comic.traditional_title,
    ]
    .filter(s => s !== undefined && s.trim() !== '')

    comic.links = [
      ['english', comic.english_link],
      ['simplified', comic.simplified_link],
      ['traditional', comic.traditional_link],
    ]
    .filter(pair => pair[1] !== undefined && pair[1].trim() !== '')

    return comic
  })
  return comics
}

main()
