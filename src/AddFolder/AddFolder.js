import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';

export default class AddFolder extends React.Component {
    static contextType = ApiContext;

    render() {
        const {
            folders = [], notes = []
        } = this.context
        return ( 
            <div>
            <button className = 'Folder__add' type = 'button'
            onClick = {this.handleClickAddFolder} >
            <FontAwesomeIcon icon = 'plus' /> 
            {' '}
            Add Folder 
            </button>
            </div>
        )
    }
}