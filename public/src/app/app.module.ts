import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileUploaderModule } from 'ng4-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DashComponent } from './user/dash/dash.component';
import { ProfileComponent } from './user/profile/profile.component';
import { GameService } from './game.service';
import { NewComponent } from './user/new/new.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashComponent,
    ProfileComponent,
    NewComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FileUploaderModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
