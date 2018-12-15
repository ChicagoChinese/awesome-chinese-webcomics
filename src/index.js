import React from 'react'
import ReactDOM from "react-dom"
import App from './App'

let { comics, genres, lastUpdated } = window.__INITIAL_STATE__
ReactDOM.hydrate(
  <App comics={comics} genres={genres} lastUpdated={lastUpdated} />,
  document.getElementById("index"))
