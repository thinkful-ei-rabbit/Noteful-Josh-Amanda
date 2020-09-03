import React from 'react';

export default function ValidateNote(props) {
  if (props.message) {
    return (
    <div className='error'>{props.message}</div>
    );
  }

  return <></>
}