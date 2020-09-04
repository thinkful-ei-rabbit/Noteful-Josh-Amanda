import React from 'react';
import PropTypes from 'prop-types';

export default function ValidateNote(props) {
  if (props.message) {
    return (
    <div className='error'>{props.message}</div>
    );
  }

  return <></>
}

ValidateNote.propTypes ={
  message: PropTypes.string
};