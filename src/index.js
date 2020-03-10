import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import history from './utils/history';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
