import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { setNewUser } from '../../actions/registerActions';
import { Redirect } from 'react-router-dom';

const CreateUser = ({ history, register, setNewUser }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.password2 !== user.password) {
      M.toast({ html: 'Passwords do not match.', classes: 'red' });
    } else {
      const newUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        access: 'mgr',
      };
      setNewUser(newUser);
      history.push('/login');
    }
  };
  if (register.venue === null) {
    return <Redirect to='/createvenue' />;
  }
  return (
    <div style={{ width: '45%', margin: '0 auto', alignSelf: 'center' }}>
      <form onSubmit={onSubmit}>
        <div>
          <h4>Create Login</h4>
          <div className='row'>
            <div className='input-field'>
              <input
                type='text'
                name='name'
                className='validate'
                onChange={onChange}
              />
              <label>Name</label>
            </div>
          </div>
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
              <label htmlFor='password' className='active'>
                Password
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field'>
              <input type='password' name='password2' onChange={onChange} />
              <label htmlFor='password2' className='active'>
                Confirm Password
              </label>
            </div>
          </div>
        </div>
        <div className='modal-footer right-align'>
          <button
            className='btn waves-effect waves-light'
            type='submit'
            name='action'
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  register: state.register,
});

export default connect(mapStateToProps, { setNewUser })(CreateUser);
