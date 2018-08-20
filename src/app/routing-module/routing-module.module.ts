import { NoteCreateEditComponent } from './../note-create-edit/note-create-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from '../route-guard.service';

const routes: Routes =
  [
    {
      path: 'notes',
      component: NotesComponent,
      canActivate: [RouteGuardService]
    },
    {
      path: '',
      redirectTo: 'notes',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [RouteGuardService],
  declarations: []
})
export class RoutingModuleModule { }
