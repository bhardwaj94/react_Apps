import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import './index.css';
import { createBrowserHistory } from 'history';
import Routes from './routes';
//import Check from './check';
const history = createBrowserHistory();
ReactDOM.render(<Provider store={store}>
    <Router history={history}>
        <Routes />
    </Router>
</Provider>, document.getElementById('root'));
//ReactDOM.render(<Check />,document.getElementById('root'));