import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadServers } from '../actions/serverActions';
import AddServer from '../modals/AddServer';

const ServerList = ({ loading, servers: { servers }, loadServers }) => {
  useEffect(() => {
    loadServers();
    //eslint-disable-next-line
  }, []);

  if (loading || servers === null) {
    return null;
  }
  return (
    <Fragment>
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
