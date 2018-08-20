import { Component, OnInit, Input, Output } from '@angular/core';
import { Note } from '../classes/note';
import { EventEmitter } from '@angular/core';
import { MdcDialog, MdcDialogComponent, MdcDialogRef } from '@angular-mdc/web';
import { NoteCreateEditComponent } from '../note-create-edit/note-create-edit.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'div[app-note]',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('note-data') note: Note;

  // tslint:disable-next-line:no-output-rename
  @Output('onDeleteNote') noteDeleted = new EventEmitter();
  // tslint:disable-next-line:no-output-rename
  @Output('onUpdateNote') noteUpdated = new EventEmitter();

  constructor(public dialog: MdcDialog) { }

  ngOnInit() {
  }

  updateNote() {
    const dialogRef = this.dialog.open(NoteCreateEditComponent, {
      data: { id: this.note.id },
      escapeToClose: true,
      clickOutsideToClose: true,
      backdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteUpdated.emit(this.note);
    });
  }

  deleteNote() {
    this.noteDeleted.emit(this.note);
  }
}
