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
    getDateRange(dateRange);
    //eslint-disable-next-line
  }, []);

  //COMPONENT STATE----------------------------------
  const [server, setServer] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [days, setDays] = useState(30);
  const onChange = (e) => {
    filterParties(e.target.value);
  };

  //CALL GET/PARTIES/HISTORY WITH QUERY PARAMETERS-----------
  const onSubmit = (e) => {
    e.preventDefault();
    //CREATE QUERY OBJECT
    const query = {
      server: server,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };
    getParties(query);
  };

  const getDateRange = (range) => {
    setDays(range);
    //get current date and time
    let now = new Date();
    //get the current date minus the range of days selected by user
    let priorDate = new Date().setDate(now.getDate() - range);
    //convert the new calculated date into javascript format instead of UNIX Timestamp
    let endDate = new Date(priorDate);
    //convert both dates to ISO strings to match those stored in database
    now = now.toISOString();
    endDate = endDate.toISOString();
    setDateRange({ startDate: now, endDate: endDate });
  };

  const clearQuery = () => {
    setServer('');
    setDays('');
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
            <form className='col s12 pad-1 row' onSubmit={onSubmit}>
              <div className='col s4'>
                <div className='input-field col-12'>
                  <select
                    className='browser-default'
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
              <div className='col s4'>
                <div className='input-field col-12'>
                  <select
                    className='browser-default'
                    value={days}
                    onChange={(e) => getDateRange(e.target.value)}
                  >
                    <option value='' disabled defaultValue>
                      Time Range
                    </option>
                    <option value={7}>7 Days</option>
                    <option value={30}>30 Days</option>
                    <option value={182}>6 Months</option>
                    <option value={182}>1 Year</option>
                    <option value={2000}>All</option>
                  </select>
                </div>
              </div>
              <div className='col s4'>
                <div className='input-field right-align'>
                  <button
                    className='btn waves-effect mx-1 blue waves-light'
                    name='action'
                    type='submit'
                  >
                    <i className='large material-icons'>search</i>
                  </button>
                  <button
                    className='btn waves-effect mx-1 red waves-light'
                    type='button'
                    onClick={(e) => {
                      clearQuery();
                    }}
                  >
                    <i className='large material-icons'>backspace</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <nav>
            <div className='nav-wrapper'>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className='input-field green text-white'>
                  <input
                    id='search'
                    type='search'
                    placeholder='Filter results by : Contact Name'
                    required
                    onChange={onChange}
                  />
                  <label className='label-icon' htmlFor='search'>
                    <i className='material-icons'>search</i>
                  </label>
                  <i className='material-icons'>close</i>
                </div>
              </form>
            </div>
          </nav>
        </div>
        {parties.length < 1 ? (
          <p className='center-align'>No Results</p>
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
                        {item.guests.map((guest, key) => (
                          <li key={key}>
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
                        {item.guests.map((guest, key) => (
                          <li key={key}>
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
