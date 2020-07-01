import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getParties,
  filterParties,
  clearParties,
} from '../actions/partyActions';
import { loadServers } from '../actions/serverActions';
import Preloader from '../layout/Preloader';
import { CollapsibleItem, Collapsible } from 'react-materialize';
import Moment from 'react-moment';
import ServerList from '../inputs/ServerList';

const History = ({
  servers,
  party: { parties, filtered },
  loading,
  getParties,
  filterParties,
  clearParties,
}) => {
  useEffect(() => {
    clearParties();
    getParties();
    loadServers();
    //eslint-disable-next-line
  }, []);
  //COMPONENT STATE----------------------------------
  const [server, setServer] = useState('');
  const [contact, setContact] = useState('');
  const onChange = (e) => {
    filterParties(e.target.value);
  };

  //CALL GET/PARTIES/HISTORY WITH QUERY PARAMETERS-----------
  const onSubmit = (e) => {
    e.preventDefault();
    //CREATE QUERY OBJECT
    const query = { contactName: contact, server: server };
    getParties(query);
  };

  const clearQuery = () => {
    getParties();
  };

  if (loading || parties === null) {
    return (
      <div className='wrapper'>
        <Preloader />
      </div>
    );
  } else
    return (
      <Fragment>
        <div className='my-2 row'>
          <div className='row'>
            <form className='col s12 pad-1' onSubmit={onSubmit}>
              <div className='col s6'>
                <div className='input-field col s12'>
                  <input
                    id='contact-name'
                    type='text'
                    className='validate'
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                  <label htmlFor='contact-name'>Contact Name</label>
                </div>
              </div>
              <div className='col s6'>
                <div className='input-field col-12'>
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
              </div>
              <div className='right-align'>
                <button
                  className='btn waves-effect mx-1 blue waves-light'
                  name='action'
                  type='submit'
                >
                  <i className='large material-icons'>search</i>
                </button>
                <button
                  className='btn waves-effect mx-1 red waves-light'
                  name='action'
                  onClick={(e) => {
                    clearQuery();
                  }}
                >
                  <i className='large material-icons'>backspace</i>
                </button>
              </div>
            </form>
          </div>
          <nav>
            <div className='nav-wrapper'>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className='input-field green'>
                  <input
                    id='search'
                    type='search'
                    placeholder='Filter by : Contact Name or Server Name'
                    required
                    onChange={onChange}
                  />
                  <label className='label-icon' for='search'>
                    <i className='material-icons'>search</i>
                  </label>
                  <i className='material-icons'>close</i>
                </div>
              </form>
            </div>
          </nav>
        </div>
        {parties.length < 1 ? (
          <p className='center-align'>No Parties Recorded</p>
        ) : (
          <Collapsible accordion popout className='fullWidth'>
            {filtered !== null
              ? filtered.map((item) => (
                  <CollapsibleItem
                    expanded={false}
                    header={
                      <div className='flex fullWidth'>
                        <div className=''>
                          <strong>{item.contact.name}</strong>{' '}
                        </div>
                        <div className=''>
                          <Moment format='MMMM Do YYYY, h:mm a'>
                            {item.time}
                          </Moment>
                        </div>
                      </div>
                    }
                    node='div'
                    key={item._id}
                  >
                    <div className='flex'>
                      <ul>
                        <p>Contact Information</p>
                        <li>
                          <small>Name: {item.contact.name}</small>
                        </li>
                        <li>
                          <small>Phone: {item.contact.phone}</small>
                        </li>
                        <li>
                          <small>Email: {item.contact.email}</small>
                        </li>
                      </ul>
                      <ul>
                        <p>Guest List</p>
                        {item.guests.map((guest) => (
                          <li>
                            <small>{guest}</small>
                          </li>
                        ))}
                      </ul>
                      <ul>
                        <p>Visit Information</p>
                        <li>
                          <small>Server: {item.server.name}</small>
                        </li>
                        <li>
                          <small>Table Number: {item.table}</small>
                        </li>
                      </ul>
                    </div>
                  </CollapsibleItem>
                ))
              : parties.map((item) => (
                  <CollapsibleItem
                    expanded={false}
                    header={
                      <div className='flex fullWidth'>
                        <div className=''>
                          <strong>{item.contact.name}</strong>{' '}
                        </div>
                        <div className=''>
                          <Moment format='MMMM Do YYYY, h:mm a'>
                            {item.time}
                          </Moment>
                        </div>
                      </div>
                    }
                    node='div'
                    key={item._id}
                  >
                    <div className='flex'>
                      <ul>
                        <p>Contact Information</p>
                        <li>
                          <small>Name: {item.contact.name}</small>
                        </li>
                        <li>
                          <small>Phone: {item.contact.phone}</small>
                        </li>
                        <li>
                          <small>Email: {item.contact.email}</small>
                        </li>
                      </ul>
                      <ul>
                        <p>Guest List</p>
                        {item.guests.map((guest) => (
                          <li>
                            <small>{guest}</small>
                          </li>
                        ))}
                      </ul>
                      <ul>
                        <p>Visit Information</p>
                        <li>
                          <small>Server: {item.server.name}</small>
                        </li>
                        <li>
                          <small>Table Number: {item.table}</small>
                        </li>
                      </ul>
                    </div>
                  </CollapsibleItem>
                ))}
          </Collapsible>
        )}
      </Fragment>
    );
};

//This function connects the component to Redux, and imports the state into the component AS A PROP
const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party,
  servers: state.servers,
});

export default connect(mapStateToProps, {
  loadServers,
  getParties,
  filterParties,
  clearParties,
})(History);
