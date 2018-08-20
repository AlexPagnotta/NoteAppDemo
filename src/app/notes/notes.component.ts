import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/notes.service';
import { Note } from '../classes/note';
import { MdcDialog } from '@angular-mdc/web';
import { NoteCreateEditComponent } from '../note-create-edit/note-create-edit.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[];
  notesToShow: Note[];

  constructor(public dialog: MdcDialog, private service: NoteService) { }

  ngOnInit() {
    this.reloadUi();
  }

  reloadUi() {
    const data = this.service.getNotes();
    this.notes = data;
    this.notesToShow = Object.assign([], this.notes);
  }

  createNote() {
    const dialogRef = this.dialog.open(NoteCreateEditComponent, {
      escapeToClose: true,
      clickOutsideToClose: true,
      backdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadUi();
    });
  }

  onUpdateNote(note) {
    this.reloadUi();
  }

  onNotesSearch(searchString) {
    console.log(searchString);
    this.notesToShow = this.notes.filter(x =>
      x.title.toUpperCase().includes(searchString.toUpperCase()) ||
      x.text.toUpperCase().includes(searchString.toUpperCase()));
  }

  public onDeleteNote(note) {
    this.service.deleteNote(note);
    this.reloadUi();
  }

}
