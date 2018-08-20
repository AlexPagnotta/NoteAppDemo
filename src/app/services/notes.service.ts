import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Note } from '../classes/note';

@Injectable()
export class NoteService {

    private url = 'http://localhost:8000/api';

    notes: Note[];

    constructor(private http: Http, private auth: AuthService) {
        this.notes = [
            {
                id: 0,
                title: 'test',
                text: 'test'
            },
            {
                id: 1,
                title: 'Lorem Ipsum',
                text: 'test'
            }
        ];
    }

    getNotes(): Note[] {
        return this.notes;
    }

    getNote(id): Note {
        const clonedNote = Object.assign({}, this.notes[id]);
        return clonedNote;
    }

    createNote(note) {
        note.id = this.notes.length;
        this.notes.push(note);
    }

    updateNote(note) {
        this.notes[note.id] = note;
    }

    deleteNote(note) {
        this.notes.splice(note.id, 1);
    }
}
