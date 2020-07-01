import React, { useEffect, Fragment } from 'react';
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

  const onChange = (e) => {
    filterParties(e.target.value);
  };

  if (loading || parties === null) {
    return (
      <div className='wrapper'>
        <Preloader />
      </div>
    );
  } else if (parties.length < 1) {
    return <p className='center-align'>No Parties Recorded</p>;
  } else
    return (
      <div className='my-2 row'>
        <nav className='col-6'>
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
      </div>
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
