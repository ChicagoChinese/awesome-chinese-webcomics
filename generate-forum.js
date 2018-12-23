// Generate HTML to copy and paste into chinese-forums.com
const fs = require('fs')
const { getBilingualComics } = require('./comics')
const nunjucks = require('nunjucks')

function main() {
  let comics = getBilingualComics().comics


  nunjucks.configure('templates')
  html = nunjucks.render('forum.html', {comics: addFields(comics)})
  fs.writeFileSync('forum.html', html, 'utf8')
  console.log('Generated forum.html')
}

function addFields(comics) {
  comics.map(comic => {
    comic.titles = [
      comic.english_title,
      comic.simplified_title,
      comic.traditional_title,
    ]
    .filter(s => s.trim() !== '')

    comic.links = [
      ['english', comic.english_link],
      ['simplified', comic.simplified_link],
      ['traditional', comic.traditional_link],
    ]
    .filter(pair => pair[1].trim() !== '')
    // comic.links = new Map(comic.links)

    return comic
  })
  return comics
}

main()
