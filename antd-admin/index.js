import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>
    {
      [1, 2].map(item => (
        <button style={{color: 'red'}}>123</button>
      ))
    }
  </div>,
  document.getElementById("app")
)