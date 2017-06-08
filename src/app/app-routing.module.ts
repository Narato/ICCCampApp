import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { MyLeisureActivitiesComponent } from './my-leisure-activities/my-leisure-activities.component';
import { CredentialsComponent } from './credentials/credentials.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: []
  },
  {
    path: 'myActivities',
    component: MyActivitiesComponent,
    children: []
  },
  {
    path: 'myLeisureActivities',
    component: MyLeisureActivitiesComponent,
    children: []
  },
  {
    path: 'credentials',
    component: CredentialsComponent,
    children: []
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
