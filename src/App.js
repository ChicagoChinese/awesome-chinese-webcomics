import React from 'react'

const characterSets = ['simplified', 'traditional']

function App({comics, lastUpdated}) {
  let genres = new Set()

  return <div className="container mx-auto my-4 font-sans text-black">
    <h1 className="mb-4">Awesome Chinese Webcomics</h1>

    <div>Last updated: {lastUpdated}</div>

    <div>
      <span>Character set:</span>
      <select>
      </select>
      <span>Genre:</span>
      <select>
      </select>
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
        {comics.map((comic, i) =>
          <tr className={i % 2 == 0 ? "bg-grey-lightest": ""}
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
}

module.exports = App
