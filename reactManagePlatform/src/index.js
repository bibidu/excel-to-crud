import React from 'react';
import ReactDom from 'react-dom';
import App from './containers/App';

import 'antd/dist/antd.css';
import './styles/base.less';

ReactDom.render(
  <App />, document.getElementById('root')
);
