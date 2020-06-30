import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import { addServer } from '../actions/serverActions';

const AddServer = ({ addServer, auth: { user, loading } }) => {
  //COMPONENT STATE --------------------------
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [current, setCurrent] = useState('');

  const onSubmit = () => {
    if (name.trim() === '') {
      M.toast({ html: 'Please enter a name', classes: 'red' });
    } else {
      const server = {
        venue: user.venue,
        name: name,
        email: email,
        phone: phone,
      };
      addServer(server);
      clearFields();
    }
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
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
          onClick={clearFields}
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
          <i className='large material-icons'>add</i>
        </Button>
      }
    >
      <div className=''>
        <h5>Add Server</h5>
        <div className='row'>
          <div className='input-field my-2'>
            <input
              type='text'
              name='name'
              onChange={(e) => setName(e.target.value)}
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

const modalStyle = {
  width: '50%',
  height: '50%',
};

//This function connects the component to Redux, and imports the state into the component AS A PROP
const mapStateToProps = (state) => ({
  auth: state.auth,
  party: state.party,
});

export default connect(mapStateToProps, { addServer })(AddServer);
