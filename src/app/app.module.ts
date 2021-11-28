import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { MyeventsComponent } from './components/user/myevents/myevents.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { MyeventComponent } from './components/user/myevent/myevent.component';
import { EventComponent } from './components/user/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/changePassword/change-password/change-password.component';
import { RestartPasswordComponent } from './components/restartPassword/restart-password/restart-password.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const config = {
  apiKey: 'AIzaSyArD0fzANzKYTs4k8rLHbK3UnCWG_Ip9pM',
  authDomain: 'imageneseventos-1e0bb.firebaseapp.com',
  databaseURL: 'https://imageneseventos-1e0bb-default-rtdb.firebaseio.com',
  projectId: 'imageneseventos-1e0bb',
  storageBucket: 'gs://imageneseventos-1e0bb.appspot.com',
  messagingSenderId: '796279284343'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent,
    DashboardComponent,
    MyeventsComponent,
    StatisticsComponent,
    MyeventComponent,
    EventComponent,
    HomeComponent,
    ChangePasswordComponent,
    RestartPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireStorageModule,// storagec
    AngularFireDatabaseModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
