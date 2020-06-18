import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadServers } from '../actions/serverActions';
import Preloader from '../layout/Preloader';
import AddBtn from '../layout/AddBtn';
import 'materialize-css/dist/css/materialize.min.css';
import AddServer from '../modals/AddServer';

const ManageStaff = ({ loading, servers: { servers }, loadServers }) => {
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
      <ul class='collection with-header full-width my-2'>
        <li class='collection-header'>
          <h5>Staff</h5>
        </li>
        {servers.map((server) => (
          <li class='collection-item avatar' key={server._id}>
            <p>
              {server.name}
              <br></br>
              <small>{server.email}</small>
            </p>
            <a href='#!' class='secondary-content'>
              <i class='material-icons'>edit</i>
            </a>
          </li>
        ))}
      </ul>
      <AddServer />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  servers: state.server,
});

export default connect(mapStateToProps, { loadServers })(ManageStaff);
