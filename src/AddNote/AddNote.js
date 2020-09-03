import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNotesForFolder } from '../notes-helpers';
import ApiContext from '../ApiContext';

export default class AddNote extends React.Component {
    static contextType = ApiContext;



    handleSubmit = (e) => {
        e.preventDefault();
        console.log('note was submitted')
        const newNoteName = e.target.newNote.value;
        const newNoteContent = e.target.noteContent.value;

        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newNoteName, content: newNoteContent })
        })
            .then(response => response.json())
            .then((newAddNote) => {
                this.context.addNote(newNoteName, newNoteContent)
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
                <form className="Note__add" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="newNote">Add a new note!</label>
                    <input type="text"
                        className="Note__add"
                        name="newNote"
                        id="newNote"
                    ></input>
                    <label htmlFor="newNote">Add new content!</label>
                    <input type="text"
                        className="Note__add"
                        name="noteContent"
                    ></input>

                    <button className='Note__add' type='submit'>
                        <FontAwesomeIcon icon='plus' />
                        {' '}
            Add Note
            </button>
                </form>
            </div>
        )
    }
}