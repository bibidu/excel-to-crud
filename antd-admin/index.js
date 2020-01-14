import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import Routers from './routers'

import App from './components/Layout'

function render(Component) {
  ReactDOM.render((
    <AppContainer>
      <Routers/>
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
