import React, { useEffect, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import {
  SwitchTransition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './App.css';
//PAGE COMPONENTS
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import History from './components/pages/History';
import About from './components/pages/About';
import ManageStaff from './components/pages/ManageStaff';
import CreateVenue from './components/auth/register/CreateVenue';
//LAYOUT COMPONENTS
import NavBar from './components/layout/NavBar';
import AddServer from './components/modals/AddServer';
//STATE AND CONTEXT MANAGEMENT
import { Provider } from 'react-redux';
import Store from './store';
//SET GLOBAL HEADERS FOR AUTHENTICATION
import setAuthToken from './components/utils/setAuthToken';
import store from './store';
import { loadUser } from './components/actions/authActions';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    M.AutoInit();
    store.dispatch(loadUser());
    //Initialize Materialize JS
  }, []);

  return (
    <body>
      <Provider store={Store}>
        <Router>
          <Fragment>
            <NavBar />
            <main>
              <div className='container'>
                <Switch>
                  <Route exact path='/login' component={Login} />

                  <Route exact path='/createvenue' component={CreateVenue} />

                  <Route exact path='/about' component={About} />

                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/history' component={History} />
                  <PrivateRoute exact path='/staff' component={ManageStaff} />
                </Switch>
              </div>
            </main>
          </Fragment>
        </Router>
      </Provider>
    </body>
  );
};

export default App;
