import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';

import { Modal, Button } from 'react-materialize';
import { addServer, setCurrentServer } from '../actions/serverActions';

const EditServer = ({
  server,
  addServer,
  current,
  setCurrentServer,
  auth: { user, loading },
}) => {
  //COMPONENT STATE --------------------------
  const [newName, setName] = useState(server.name);
  const [newEmail, setEmail] = useState(server.email);
  const [newPhone, setPhone] = useState(server.phone);

  const onSubmit = () => {
    if (server.name.trim() === '') {
      M.toast({ html: 'Please enter a name', classes: 'red' });
    } else {
      const server = {
        venue: user.venue,
        name: newName,
        email: newEmail,
        phone: newPhone,
        _id: current._id,
      };
      console.log(server);
    }
  };

  const setCurrent = (e) => {
    setCurrentServer(server);
  };

  return (
    <Modal
      actions={[
        <Button
          flat
          onClick={onSubmit}
          node='button'
          waves='green'
          modal='close'
          className='green white-text'
        >
          Save
        </Button>,
        <Button
          flat
          modal='close'
          node='button'
          waves='red'
          className='red white-text'
        >
          Cancel
        </Button>,
      ]}
      bottomSheet={false}
      fixedFooter={false}
      id='Modal-0'
      open={false}
      options={{
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%',
      }}
      trigger={
        <Button node='button'>
          <i className='large material-icons' onClick={setCurrent}>
            edit
          </i>
        </Button>
      }
    >
      <div className=''>
        <h5>Edit Server</h5>
        <div className='row'>
          <div className='input-field my-2'>
            <input
              type='text'
              name='name'
              onChange={(e) => setName(e.target.value)}
              value={newName}
            />
            <label htmlFor='name' className='active'>
              Name -- Required
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field my-2'>
            <input
              type='text'
              name='name'
              onChange={(e) => setEmail(e.target.value)}
              value={newEmail}
            />
            <label htmlFor='name' className='active'>
              Phone
            </label>
          </div>
          <div className='input-field my-2'>
            <input
              type='text'
              name='name'
              onChange={(e) => setPhone(e.target.value)}
              value={newPhone}
            />
            <label htmlFor='name' className='active'>
              Email
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

//This function connects the component to Redux, and imports the state into the component AS A PROP
const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party,
  current: state.server.current,
});

export default connect(mapStateToProps, { addServer, setCurrentServer })(
  EditServer
);
