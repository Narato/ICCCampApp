import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { MyLeisureActivitiesComponent } from './my-leisure-activities/my-leisure-activities.component';
import { CredentialsComponent } from './credentials/credentials.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyActivitiesComponent,
    MyLeisureActivitiesComponent,
    CredentialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
