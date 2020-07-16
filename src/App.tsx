import 'normalize.css';
import './App.css';
import 'styles/index.scss';
import fastclick from 'fastclick';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routeConfig from 'routes';
import { Provider } from 'react-redux';
import store from 'stores';
fastclick.attach(document.body);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>{renderRoutes(routeConfig)}</Router>
      </Provider>
    );
  }
}

export default App;
