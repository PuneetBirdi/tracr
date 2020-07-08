import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  loadServers,
  addServer,
  setCurrentServer,
} from '../actions/serverActions';
import Preloader from '../layout/Preloader';
import 'materialize-css/dist/css/materialize.min.css';
import AddServer from '../modals/AddServer';
import EditServer from '../modals/EditServer';

const ManageStaff = ({
  loading,
  servers: { servers },
  loadServers,
  addServer,
  setCurrentServer,
}) => {
  useEffect(() => {
    loadServers();
    //eslint-disable-next-line
  }, []);

  const remove = (id, name, email, phone) => {
    const removedServer = {
      id,
      name,
      email,
      phone,
      active: false,
    };

    addServer(removedServer);
  };

  if (loading || servers === null) {
    return (
      <div className='wrapper'>
        <Preloader />
      </div>
    );
  }
  return (
    <Fragment>
      <ul class='collection with-header full-width my-2'>
        <li class='collection-header'>
          <h5>Staff</h5>
        </li>
        {servers.length < 1 ? (
          <li class='collection-item avatar'>
            <p className='center-align'>Please Add Staff</p>
          </li>
        ) : (
          servers.map((server) => (
            <li class='collection-item avatar flex' key={server._id}>
              <div className=''>
                <p>
                  {server.name}
                  <br></br>
                  <small>{server.email}</small>
                  <br></br>
                  <small>{server.phone}</small>
                </p>
              </div>
              <div className=''>
                <EditServer server={server} />
                <button
                  className='btn waves-effect  red waves-light'
                  name='action'
                  onClick={(e) =>
                    remove(server._id, server.name, server.email, server.phone)
                  }
                >
                  <i className='material-icons'>delete</i>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <AddServer />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  servers: state.server,
});

export default connect(mapStateToProps, {
  addServer,
  loadServers,
  setCurrentServer,
})(ManageStaff);
