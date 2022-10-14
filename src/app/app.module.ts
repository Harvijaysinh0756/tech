import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './Components/signin/signin.component';
import { AuthService } from './Services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './Components/landingpage/landingpage.component';
import { CreatePostComponent } from './Components/landingpage/create-post/create-post.component';
import { ProfileComponent } from './Components/landingpage/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
//webcame
import { WebcamModule } from 'ngx-webcam';
// material ui  

// import { initializeApp } from "firebase/app";
// initializeApp(environment.firebase);


import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { MessagingService } from './Services/messaging.service';
import { AsyncPipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LandingpageComponent,
    CreatePostComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireMessagingModule,
    //material components
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    WebcamModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  providers: [AuthService,MessagingService,AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
