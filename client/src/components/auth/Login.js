import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { login, loadUser } from '../actions/authActions';
import { Redirect } from 'react-router-dom';

const Login = ({
  history,
  auth: { error, isAuthenticated, loading },
  login,
  loadUser,
}) => {
  // setting the user Input component state
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      M.toast({ html: 'Please fill in all fields.', classes: 'red' });
    } else {
      login(user);
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div style={{ width: '45%', margin: '0 auto', alignSelf: 'center' }}>
      <form onSubmit={onSubmit}>
        <div>
          <h4>Login</h4>
          <div className='row'>
            <div className='input-field'>
              <input
                type='email'
                name='email'
                className='validate'
                onChange={onChange}
              />
              <label htmlFor='email' className='active'>
                Email
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field'>
              <input type='password' name='password' onChange={onChange} />
              <label htmlFor='password' className='active'>
                Password
              </label>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button
            className='btn waves-effect waves-light'
            type='submit'
            name='action'
          >
            Login
          </button>
          <div className=''>
            <p>Test credentials:</p>
            <strong>Email: testAccount@gmail.com</strong>
            <br></br>
            <strong>Password: testing</strong>
            <p>
              <strong>Notes:</strong>
              <ul>
                <li>
                  BUG: Firefox does not support datetime picker so it's only
                  displaying a text box. Will switch to a split input model.
                </li>
                <li>TODO: Pagination for party history.</li>
              </ul>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
