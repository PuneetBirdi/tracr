import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadServers } from '../actions/serverActions';
import Preloader from '../layout/Preloader';
import AddBtn from '../layout/AddBtn';
import AddServer from '../modals/AddServer';

const ServerList = ({ loading, servers: { servers }, loadServers }) => {
  useEffect(() => {
    loadServers();
    //eslint-disable-next-line
  }, []);

  if (loading || servers === null) {
    return (
      <div className='wrapper'>
        <Preloader />
      </div>
    );
  }
  return (
    <Fragment>
      <option value='' disabled defaultValue>
        Select Server
      </option>
      {servers.map((server) => (
        <option key={server._id} value={server._id}>
          {server.name}
        </option>
      ))}
      <AddServer />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  servers: state.server,
});

export default connect(mapStateToProps, { loadServers })(ServerList);
