import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { NoteService } from '../services/notes.service';
import { Note } from '../classes/note';
import { MdcDialogRef } from '@angular-mdc/web';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-create-edit',
  templateUrl: './note-create-edit.component.html',
  styleUrls: ['./note-create-edit.component.scss']
})
export class NoteCreateEditComponent implements OnInit {

  private note: Note;
  private isANewNote: boolean;

  constructor(private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MdcDialogRef<NoteCreateEditComponent>,
    private service: NoteService) { }

  ngOnInit() {

    this.note = new Note();

    if (!this.dialogRef.data) {
      this.isANewNote = true;
      return;
    } else {
      const id: number = this.dialogRef.data.id;
      this.getNoteData(id);
      this.isANewNote = false;
    }
  }

  getNoteData(id) {
    this.note = this.noteService.getNote(id);
  }

  saveNote() {
    if (!this.isANewNote) {
      this.updateNote();
    } else {
      this.createNote();
    }

    this.router.navigate(['notes']);
  }

  updateNote() {
    this.noteService.updateNote(this.note);
  }

  createNote() {
    this.noteService.createNote(this.note);
  }

  deleteNote() {
    this.service.deleteNote(this.note);

    this.dialogRef.close('a'); // TODO if empty doesn reload, cause doesnt enter the after closed method
  }
}
