import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { App } from '..';
import configureStore from '../../../configureStore';
import { Provider } from 'react-redux';


it('renders without crashing', () => {
    const history = createHistory();
    const initialState = {};
    const store = configureStore(initialState, history);

    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, div);
});