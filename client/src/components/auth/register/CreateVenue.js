import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setNewVenue } from '../../actions/registerActions';

const CreateVenue = ({
  history,
  setNewVenue,
  auth: { error, isAuthenticated, loading },
  login,
}) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
  });
  const [venue, setVenue] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const newVenue = { ...venue, address };
    setNewVenue(newVenue);
    history.push('/createuser');
  };
  return (
    <div>
      <h5>Register Your Venue</h5>
      <form className='col s12 pad-1' onSubmit={onSubmit}>
        <div className='row z-depth '>
          <div className='col s12'>
            <div className='input-field col s12'>
              <input
                id='venue-name'
                type='text'
                className='validate'
                required
                value={venue.name}
                onChange={(e) => {
                  setVenue({ ...venue, name: e.target.value });
                }}
              />
              <label htmlFor='venue-name'>Venue Name</label>
            </div>
            <div className='input-field col s6'>
              <input
                id='venue-phone'
                name='venue-phone'
                type='tel'
                className='validate'
                pattern='[0-9]{10,}'
                required
                value={venue.phone}
                onChange={(e) => setVenue({ ...venue, phone: e.target.value })}
              />
              <label htmlFor='phone'>Phone</label>
            </div>
            <div className='input-field col s6'>
              <input
                id='venue-email'
                name='venue-email'
                type='email'
                className='validate'
                required
                value={venue.email}
                onChange={(e) => {
                  setVenue({ ...venue, email: e.target.value });
                }}
              />
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          <div className='col s6'>
            <div className='input-field col s12'>
              <input
                id='street-address'
                type='text'
                className='validate'
                required
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <label htmlFor='street-address'>Street Address</label>
            </div>
            <div className='input-field col s12'>
              <input
                id='city'
                type='text'
                className='validate'
                required
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <label htmlFor='city'>City</label>
            </div>
            <div className='input-field col s12'>
              <select
                id='province'
                type='text'
                className='browser-default'
                required
                value={address.province}
                onChange={(e) =>
                  setAddress({ ...address, province: e.target.value })
                }
              >
                <option value='' disabled defaultValue>
                  Select Province
                </option>
                <option value='Alberta'>Alberta</option>
                <option value='British Columbia'>British Columbia</option>
                <option value='Manitoba'>Manitoba</option>
                <option value='New Brunswick'>Newfoundland and Labrador</option>
                <option value='Northwest Territories'>
                  Northwest Territories
                </option>
                <option value='Nova Scotia'>Nova Scotia</option>
                <option value='Nunavut'>Nunavut</option>
                <option value='Ontario'>Ontario</option>
                <option value='Prince Edward Island'>
                  Prince Edward Island
                </option>
                <option value='Quebec'>Quebec</option>
                <option value='Saskatchewan'>Saskatchewan</option>
                <option value='Yukon'>Yukon</option>
              </select>
            </div>
            <div className='input-field col s12'>
              <input
                id='postal-code'
                type='text'
                className='validate'
                required
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({ ...address, postalCode: e.target.value })
                }
              />
              <label htmlFor='postal-code'>Postal Code</label>
            </div>
            <div className='input-field col s12'>
              <input
                id='country'
                type='text'
                className='validate'
                required
                value='Canada'
              />
            </div>
          </div>
        </div>
        <div className='footer right-align'>
          <button
            className='btn waves-effect  green waves-light'
            type='submit'
            name='action'
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  register: state.register,
});

export default connect(mapStateToProps, { setNewVenue })(CreateVenue);
