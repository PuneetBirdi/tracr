import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { addParty } from '../actions/partyActions';
import { getParties } from '../actions/partyActions';
import Preloader from '../layout/Preloader';
import M from 'materialize-css/dist/js/materialize.min.js';
import ServerList from '../inputs/ServerList';

const Home = ({ addParty, loadUser, auth: { user, loading } }) => {
  //COMPONENT STATE----------------------------------
  const [contact, setContact] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [guests, setGuests] = useState(['', '']);
  const [server, setServer] = useState('');
  const [table, setTable] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  //CLEAR FORM-----------------------------
  const clearForm = () => {
    setContact({
      contactName: '',
      contactEmail: '',
      contactPhone: '',
    });
    setGuests(['', '', '' ,'' ,'' ,'']);
    setServer('');
    setTable('');
    setTime('');
    setNotes('');
  };

  //AGG GUEST TO COMPONENT STATE----------------------
  const addGuest = (index, name) => {
    let array = [...guests];
    array[index] = name;
    setGuests(array);
  };

  //ON SUBMIT FUNCTION--------------------
  const onSubmit = (e) => {
    e.preventDefault();

    //BUILD PARTY OBJECT ---------------------------------
    const party = {
      venue: user.venue,
      contact: {
        name: contact.contactName,
        email: contact.contactEmail,
        phone: contact.contactPhone,
      },
      table: table,
      server: server,
      time: time,
      guests: guests,
      notes: notes,
    };
    addParty(party);
    M.toast({ html: 'Saved.', classes: 'green' });
    clearForm();
  };

  if (loading) {
    return (
      <div className='wrapper'>
        <Preloader />
      </div>
    );
  }
  return (
    <div className='row pad-1'>
      <h5>Party Check-In</h5>
      <form className='col s12 pad-1' onSubmit={onSubmit}>
        <div className='row z-depth '>
          <div className='col s6'>
            <div className='input-field col s12'>
              <input
                placeholder='Main Contact Name'
                id='contact-name'
                type='text'
                className='validate'
                required
                value={contact.contactName}
                onChange={(e) => {
                  addGuest(0, e.target.value);
                  setContact({ contactName: e.target.value });
                }}
              />
            </div>
            <div className='input-field col s6'>
              <input
                id='contact-phone'
                name='contact-phone'
                type='tel'
                className='validate'
                pattern='[0-9]{10}'
                value={contact.contactPhone}
                onChange={(e) =>
                  setContact({ ...contact, contactPhone: e.target.value })
                }
              />
              <label htmlFor='phone'>Phone</label>
            </div>
            <div className='input-field col s6'>
              <input
                id='contact-email'
                name='contact-email'
                type='email'
                className='validate'
                value={contact.contactEmail}
                onChange={(e) => {
                  setContact({ ...contact, contactEmail: e.target.value });
                }}
              />
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          <div className='col s6'>
            <div className='input-field'>
              <select
                className='browser-default'
                required
                value={server}
                onChange={(e) => setServer(e.target.value)}
              >
                <option value='' disabled defaultValue>
                  Select Server
                </option>
                <ServerList />
              </select>
            </div>
            <div className='input-field col s6'>
              <input
                id='last_name'
                type='number'
                className='validate'
                required
                value={table}
                onChange={(e) => setTable(e.target.value)}
              />
              <label htmlFor='last_name'>Table Number</label>
            </div>
            <div className='input-field col s6'>
              <input
                type='datetime-local'
                required
                value={time}
                defaultTime='1:15'
                onChange={(e) => setTime(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col s6'>
            <div className='input-field col s12'>
              <input
                id='guest'
                type='text'
                className='validate'
                value={guests[1]}
                onChange={(e) => addGuest(1, e.target.value)}
              />
              <label htmlFor='guest'>Guest 2</label>
            </div>
            <div className='input-field col s12'>
              <input
                id='guest'
                type='text'
                className='validate'
                value={guests[2]}
                onChange={(e) => addGuest(2, e.target.value)}
              />
              <label htmlFor='guest'>Guest 3</label>
            </div>
            <div className='input-field col s12'>
              <input
                id='guest'
                type='text'
                className='validate'
                value={guests[3]}
                onChange={(e) => addGuest(3, e.target.value)}
              />
              <label htmlFor='guest'>Guest 4</label>
            </div>
            <div className='input-field col s12'>
              <input
                id='guest'
                type='text'
                className='validate'
                value={guests[4]}
                onChange={(e) => addGuest(4, e.target.value)}
              />
              <label htmlFor='guest'>Guest 5</label>
            </div>
            <div className='input-field col s12'>
              <input
                id='guest'
                type='text'
                className='validate'
                value={guests[5]}
                onChange={(e) => addGuest(5, e.target.value)}
              />
              <label htmlFor='guest'>Guest 6</label>
            </div>
          </div>
          <div className='col s6'>
            <div className='input-field'>
              <textarea
                id='notes'
                className='materialize-textarea'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <label htmlFor='notes'>Add special notes or requests.</label>
            </div>
          </div>
        </div>
        <div className='footer'>
          <button
            className='btn waves-effect  green waves-light'
            type='submit'
            name='action'
          >
            Check In
          </button>
          <button
            className='btn waves-effect mx-1 red waves-light'
            onClick={(e) => clearForm()}
            name='action'
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

//This function connects the component to Redux, and imports the state into the component AS A PROP
const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party,
});

export default connect(mapStateToProps, { getParties, addParty, loadUser })(
  Home
);
