import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { MyLeisureActivitiesComponent } from './my-leisure-activities/my-leisure-activities.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { TimeTableService } from './time-table.service';
import { UserService } from './user.service';
import { AnnouncementService } from "app/announcement.service";

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
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    TimeTableService,
    UserService,
    AnnouncementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
