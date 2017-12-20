import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'sanitize.css/sanitize.css';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
