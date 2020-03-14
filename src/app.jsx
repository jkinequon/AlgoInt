/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import SecureRouter from './SecureRouter'

//Root sass file for webpack to compile
import './scss/main';

//Initial Default Redux Settings  
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SecureRouter />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

