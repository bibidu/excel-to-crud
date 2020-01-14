import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'antd/dist/antd.css';

import App from './components/Layout'

function render(Component) {
  ReactDOM.render((
    <AppContainer>
      <Component />
    </AppContainer>
  ),
    document.getElementById("app")
  )
}

render(App)

if (module.hot) {
  module.hot.accept('/', () => {
    render(App)
  })
}
