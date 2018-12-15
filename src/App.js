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
            <th>Character set</th>
            <th>Genres</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {comics
            .filter(comic => genre === 'all' ? true : comic.genres.includes(genre))
            .filter(comic => charSet === 'all' ? true : comic.character_set === charSet)
            .map((comic, i) =>
              <tr className={i % 2 === 0 ? "bg-grey-lightest" : ""}
                key={comic.link}>
                <td>
                  <a href={comic.link} target="_blank">
                    {comic.title}
                  </a>
                </td>
                <td>{comic.character_set}</td>
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
