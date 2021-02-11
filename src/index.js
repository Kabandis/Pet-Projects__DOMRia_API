import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from "react-router-dom";

import Main from "./Main"

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));