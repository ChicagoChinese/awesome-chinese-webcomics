import React from 'react'

function App({comics}) {
  return <div className="container mx-auto my-4 font-sans">
    <h1 className="mb-4">Awesome Chinese Webcomics</h1>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Character set</th>
          <th>Genre</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {comics.map(comic =>
          <tr key={comic.link}>
            <td>
              <a href={comic.link} target="_blank">
                {comic.title}
              </a>
            </td>
            <td>{comic.character_set}</td>
            <td>{comic.genre}</td>
            <td>{comic.notes}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
}

module.exports = App
