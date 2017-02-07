/**
 * Created by orel- on 07/Feb/17.
 */
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import routes from './routes';

render((
    <Router history={browserHistory}>{routes}</Router>
), document.getElementById('app'));
