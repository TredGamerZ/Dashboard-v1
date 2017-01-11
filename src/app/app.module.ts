import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { LoginComponent } from './login/login.component';
import {RouterModule,Routes} from "@angular/router";
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MycoursesComponent } from './mycourses/mycourses.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { AssignmentComponent } from './assignment/assignment.component';
import {FileDropDirective} from "ng2-file-upload";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'about',      component: AboutComponent },
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'course/:id',      component: CoursepageComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    LoginComponent,
    AboutComponent,
    DashboardComponent,
    MycoursesComponent,
    CoursepageComponent,
    AssignmentComponent,
    FileDropDirective
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
