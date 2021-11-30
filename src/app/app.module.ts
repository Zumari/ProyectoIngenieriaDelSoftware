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
import { AngularFireModule } from  '@angular/fire';
import { AngularFirestoreModule } from  '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';


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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    AngularFireAuthModule,
    AngularFireStorageModule,// storagec
    AngularFireDatabaseModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
