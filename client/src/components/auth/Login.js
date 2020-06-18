import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { login, loadUser } from '../actions/authActions';
import Preloader from '../layout/Preloader';

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
      }, 500);
    }
  };

  //Check if the user is already logged in
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      console.log('work1');
      history.push('/');
    } else if (error) {
      M.toast({ html: 'Invalid Credentials.', classes: 'red' });
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  return (
    <div style={{ width: '30%', margin: '0 auto', alignSelf: 'center' }}>
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
              <label>Email</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field'>
              <input type='password' name='password' onChange={onChange} />
              <label htmlFor='lastName' className='active'>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
