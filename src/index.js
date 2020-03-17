import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store'
import middleware from './middleware'
import history from './history'
import {Router} from 'react-router-dom'

const store = createStore(reducer, middleware)

ReactDOM.render(<Provider store={store}><Router history={history}><App /></Router></ Provider>, document.getElementById('root'));
