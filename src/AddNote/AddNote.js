import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNotesForFolder } from '../notes-helpers';
import ApiContext from '../ApiContext';
import ValidateNote from './ValidateNote';
import './AddNote.css'

export default class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            newNote: {
                value: '',
                touched: false,
            },
            noteContent: {
                value: '',
                touched: false,
            }
        }
    }

    updateNewNote(newNote) {
        this.setState({ newNote: { value: newNote, touched: true } })
    }

    updateNoteContent(noteContent) {
        this.setState({ noteContent: { value: noteContent, touched: true } })
    }

    


    handleSubmit = (e) => {
        e.preventDefault();
        console.log('note was submitted')
        const newNoteName = e.target.newNote.value;
        const newNoteContent = e.target.noteContent.value;
        const folderId = e.target.selectFolder.value;

        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newNoteName, content: newNoteContent, folderId })
        })
            .then(response => response.json())
            .then((newAddNote) => {
                this.context.addNote(newAddNote)
                this.props.history.push('/')
            })
            .catch((error) => {
                console.log('catch', error);
            });

    }

    validateNoteName() {
        const newNoteName = this.state.newNote.value.trim();
        console.log('validate note ran')
        if (newNoteName === 0) {
            return 'Your note needs a name!'
        }
    }

    validateNoteContent() {
        const updateNoteContent = this.state.noteContent.value.trim();
        if (updateNoteContent === 0) {
            return 'Your note needs a name!'
        } else if (updateNoteContent < 3) {
            return `2 characters don't make a note!`
        }
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
                        onChange={e => this.updateNewNote(e.target.value)}                                               
                        required>
                    </input>

                    <label htmlFor="newNote">Add new content!</label>
                    <input type="text"
                        className="Note__add"
                        name="noteContent"
                        onChange={e => this.updateNoteContent(e.target.value)}                                                
                        required
                    ></input>

                    <select name="selectFolder">{this.context.folders.map(folder =>
                        <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                    <button
                        className='Note__add'
                        type='submit'
                        disabled={
                            this.validateNoteName() ||
                            this.validateNoteContent()
                        }>
                        <FontAwesomeIcon icon='plus' />
                        {' '}
            Add Note
            </button>
                </form>
                {this.state.newNote.touched && <ValidateNote message={this.validateNoteContent()} />}
                {this.state.noteContent.touched && <ValidateNote message={this.validateNoteName()} />}
            </div>
        )
    }
}