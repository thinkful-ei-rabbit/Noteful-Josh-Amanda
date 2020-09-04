import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddFolder.css';
import ApiContext from '../ApiContext';

export default class AddFolder extends React.Component {
    static contextType = ApiContext;



    handleSubmit = (e) => {
        e.preventDefault();
        console.log('form was submitted')
        const newFolderName = e.target.newFolder.value;

        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newFolderName })
        })
            .then(response => response.json())
            .then((newFolder) => {
                this.context.addFolder(newFolder)
                this.props.history.push('/')
            })
            .catch((error) => {
                console.log('catch', error);
            });

    }






    render() {
        const {
            folders = [], notes = []
        } = this.context
        return (
            <div>
                <form className="Folder__add" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="newFolder">Add a new folder!</label>
                    <input type="text"
                        className="Folder__add"
                        name="newFolder"
                        id="newFolder"
                    ></input>

                    <button className='Folder__add' type='submit'>
                        <FontAwesomeIcon icon='plus' />
                        {' '}
            Add Folder
            </button>
                </form>
            </div>
        )
    }
}