import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { HttpModule }        from '@angular/http';
import { FormsModule }       from '@angular/forms'; // <-- NgModel lives here
import { AppComponent }      from './app.component';
import { AppRoutingModule }  from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommentDetailComponent } from './components/comment_detail/comment.detail.component';
import { CasesComponent } from './components/cases/cases.component';
import { CaseDetailComponent } from './components/case_detail/case.detail.component';
import { CaseCreationComponent } from './components/case_creation/case.creation.component';
import { CaseEditionComponent } from './components/case_edition/case.edition.component';
import { CaseFormComponent } from './components/case_form/case.form.component';
import { CommentFormComponent } from './components/comment_form/comment.form.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { LoginComponent } from './components/login/login.component';
import { AnalyticTool } from './services/analytic_tool.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { HttpService } from './services/http.service';
import { ResourceService } from './services/resource.service';
import { CasesService } from './services/cases.service';
import { CommentsService } from './services/comments.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule, DropdownModule } from 'primeng/primeng';
import { WindowRef } from './services/window_ref.service';
import { JwtHelper} from 'angular2-jwt';
import { MomentModule } from 'angular2-moment';
import {CalendarModule} from 'primeng/primeng';

import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MomentModule,
    FormsModule,
    CalendarModule,
    HttpModule,
    AppRoutingModule,
    MultiSelectModule,
    DropdownModule
  ],
  declarations: [
    AppComponent,
    SpinnerComponent,
    DashboardComponent,
    CaseFormComponent,
    CommentFormComponent,
    DatepickerComponent,
    LoginComponent,
    CasesComponent,
    CaseDetailComponent,
    CaseCreationComponent,
    CaseEditionComponent,
    CommentDetailComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ WindowRef, AnalyticTool, AuthGuard, AuthenticationService,HttpService, ResourceService, CasesService, CommentsService, JwtHelper ]
})
export class AppModule { }

