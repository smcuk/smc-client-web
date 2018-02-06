import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router'
import createHistory from 'history/createBrowserHistory';
import { DashboardPage } from '..';
import configureStore from '../../../configureStore';
import { Provider } from 'react-redux';


it('renders dashboard without crashing', () => {


    const history = createHistory();
    const initialState = {};
    const store = configureStore(initialState, history);

    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
        <MemoryRouter>
            <DashboardPage />
        </MemoryRouter>
    </Provider>, div);
});