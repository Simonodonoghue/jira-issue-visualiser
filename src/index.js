import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router
} from "react-router-dom";

import '../assets/fonts/GloberDemo-SemiBold.otf';
import '../assets/fonts/GloberDemo-Thin.otf'

ReactDOM.render((
  <Router>
    <App />
  </Router>),
  document.getElementById('root')

);
