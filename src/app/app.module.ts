import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { RoutingModuleModule } from './routing-module/routing-module.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthRequestOptions } from './auth-classes/auth.request';
import {RequestOptions} from '@angular/http';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService} from './services/auth.service';
import { AuthErrorHandler } from './auth-classes/auth-error-handler';
import { ErrorHandler} from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { NoteService} from './services/notes.service';
import {FormsModule} from '@angular/forms';
import { NoteComponent } from './note/note.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoteCreateEditComponent } from './note-create-edit/note-create-edit.component';
import { MdcButtonModule, MdcFabModule,
  MdcGridListModule, MdcIconModule,
  MdcMenuModule, MdcIconButtonModule,
  MdcImageListModule, MdcDialogModule  } from '@angular-mdc/web';
import {AutosizeModule} from 'ngx-autosize';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    LoginComponent,
    SignupComponent,
    NoteComponent,
    NavbarComponent,
    NoteCreateEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModuleModule,
    // NgbModule.forRoot(),
    RoutingModuleModule,
    HttpClientModule,
    HttpModule,
    MdcButtonModule,
    MdcGridListModule,
    MdcMenuModule,
    MdcIconButtonModule,
    MdcImageListModule,
    MdcFabModule,
    MdcIconModule,
    MdcDialogModule,
    AutosizeModule
  ],
  entryComponents: [
    NoteCreateEditComponent
  ],
  providers: [
    {
      provide: RequestOptions,
      useClass: AuthRequestOptions
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },
    AuthService,
    NoteService,
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
