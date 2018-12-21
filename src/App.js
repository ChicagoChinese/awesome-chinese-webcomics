import React from 'react'
const { useState } = React

const characterSets = ['all', 'simplified', 'traditional']

function Select({ initValue, options, onChange }) {
  let [value, setValue] = useState(initValue)

  return (
    <select value={value} onChange={evt => {
      onChange(evt.target.value)
      setValue(evt.target.value)
    }}>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  )
}

function filterCharSet(charSet, comic) {
  if (charSet === 'all') {
    return true
  } else if (charSet === 'simplified' && comic.simplified_link) {
    return true
  } else if (charSet === 'traditional' && comic.traditional_link) {
    return true
  }
  return false
}

function App({ comics, genres, lastUpdated }) {
  let [genre, setGenre] = useState('all')
  let [charSet, setCharSet] = useState('all')

  genres = ['all', ...genres]

  return (
    <div className="container mx-auto my-4 font-sans text-black">
      <h1 className="mb-4">Awesome Chinese Webcomics</h1>

      <div className="mb-4">Last updated: {lastUpdated}</div>

      <div className="mb-4">
        <span>Character set:</span>
        <Select
          initValue={genre}
          options={characterSets}
          onChange={val => {
            console.log(val);
            setCharSet(val)
          }} />
        <span>Genre:</span>
        <Select
          initValue={charSet}
          options={genres}
          onChange={val => setGenre(val)} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Links</th>
            <th>Genres</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {comics
            .filter(comic => genre === 'all' ? true : comic.genres.includes(genre))
            .filter(comic => filterCharSet(charSet, comic))
            .map((comic, i) =>
              <tr className={i % 2 === 0 ? "bg-grey-lightest" : ""}
                key={comic.title}>
                <td>{comic.title}</td>
                <td>
                  {comic.simplified_link &&
                    <a href={comic.simplified_link} target="_blank" className="mr-4">simplified</a>
                  }
                  {comic.traditional_link &&
                    <a href={comic.traditional_link} target="_blank">traditional</a>
                  }
                </td>
                <td>{comic.genres.join(', ')}</td>
                <td>{comic.notes}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

module.exports = App
