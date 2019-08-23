import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lobster Two:400', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
