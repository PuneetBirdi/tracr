import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

const NavBar = ({ auth, logout }) => {
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/createvenue'>Register</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>Check-In</Link>
      </li>
      <li>
        <Link to='/history'>History</Link>
      </li>
      <li>
        <Link to='/staff'>Manage Staff</Link>
      </li>
      <li>
        <a href='#!' onClick={(e) => logout()}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className='blue darken-2'>
        <div className='nav-wrapper'>
          <a href='#' class='brand-logo' style={{ paddingLeft: '1.0rem' }}>
            Tracr
          </a>
          <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            {auth.isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
      <ul className='sidenav' id='mobile-demo'>
        {auth.isAuthenticated ? authLinks : guestLinks}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
