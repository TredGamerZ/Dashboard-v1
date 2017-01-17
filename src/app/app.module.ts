import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
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
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { RegisterComponent } from './register/register.component';
import {AuthGaurdService} from "./services/auth-gaurd.service";
import {LoginService} from "./services/login.service";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'about',      component: AboutComponent },
  { path: 'dashboard',      component: DashboardComponent ,canActivate:[AuthGaurdService]},
  { path: 'course/:id',      component: CoursepageComponent ,canActivate:[AuthGaurdService] },
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

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

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
    FileDropDirective,
    SafeHtmlPipe,
    RegisterComponent,

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ReactiveFormsModule

  ],
  providers: [AuthGaurdService,LoginService],
  bootstrap: [AppComponent]
})

export class AppModule { }
