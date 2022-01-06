import React from 'react';
import ReactDOM from 'react-dom';

import 'regenerator-runtime/runtime';

import { App } from './app';

import './shared/styles/global.css';

ReactDOM.render(
  <App/>,
  document.querySelector('#app'),
);
