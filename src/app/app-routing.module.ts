import { UserGuard } from './guards/user/user.guard';
import { HomeComponent } from './components/home/home.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MyeventsComponent } from './components/user/myevents/myevents.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyeventComponent } from './components/user/myevent/myevent.component';
import { EventComponent } from './components/user/event/event.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: HomeComponent},
  //{ path: 'usuario', component:  UserComponent, canActivate: [UserGuard], canActivateChild: [UserGuard], children: [
  { path: 'usuario', component:  UserComponent, children: [
  //  {path: '', redirectTo: '/usuario/eventos', pathMatch: 'full'},
    {path: 'eventos', component: DashboardComponent},
    {path: 'mis-eventos', component: MyeventsComponent},
    {path: 'perfil', component: ProfileComponent},
    {path: 'estadisticas', component: StatisticsComponent},
    {path: 'mi-evento/:name', component: MyeventComponent},
    {path: 'evento/:name', component: EventComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
