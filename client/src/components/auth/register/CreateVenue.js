import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const CreateVenue = ({
  history,
  auth: { error, isAuthenticated, loading },
  login,
}) => {
  // setting the user Input component state
  const [place, setPlace] = useState('');
  const [placeID, setPlaceID] = useState('');

  const handleSelect = async (selection, id) => {
    setPlace(selection);
    setPlaceID(id);
  };

  const onChange = (e) => {
    console.log('change');
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const listStyling = { padding: ' 0 0.5rem' };

  const renderFunc = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
  }) => (
    <div className='autocomplete-root'>
      <input {...getInputProps()} />
      <div className='autocomplete-dropdown-container'>
        {loading && <div>Loading...</div>}
        {suggestions.map((suggestion, key) => (
          <div
            className='valign-wrapper'
            key={key}
            {...getSuggestionItemProps(suggestion)}
          >
            <p key={key}>{suggestion.description}</p>
            <p>{suggestion.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div>
      <form>
        <div>
          <h4>Where?</h4>
          <div className='row'>
            <PlacesAutocomplete
              value={place}
              onChange={setPlace}
              onSelect={handleSelect}
            >
              {renderFunc}
            </PlacesAutocomplete>
          </div>
        </div>
        <div className='modal-footer'>
          <button
            className='btn waves-effect waves-light'
            type='submit'
            name='action'
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CreateVenue);
