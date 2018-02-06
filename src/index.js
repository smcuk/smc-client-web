import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'sanitize.css/sanitize.css';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Import CSS reset and Global Styles
import './global-styles';

import sagas from './containers/App/sagas';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

// Inject default app sagas
sagas.map(store.runSaga);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
