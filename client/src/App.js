import React, { useEffect, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
//PAGE COMPONENTS
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import History from './components/pages/History';
import About from './components/pages/About';
import ManageStaff from './components/pages/ManageStaff';
//LAYOUT COMPONENTS
import NavBar from './components/layout/NavBar';
//STATE AND CONTEXT MANAGEMENT
import { Provider } from 'react-redux';
import Store from './store';
//SET GLOBAL HEADERS FOR AUTHENTICATION

const App = () => {
  useEffect(() => {
    //Initialize Materialize JS
    M.AutoInit();
  });

  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <NavBar />
          <div className='container'>
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/history' component={History} />
              <PrivateRoute exact path='/staff' component={ManageStaff} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
