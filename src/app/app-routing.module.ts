import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { DashboardComponent }    from './components/dashboard/dashboard.component'
import { CasesComponent }    from './components/cases/cases.component'
import { CaseDetailComponent }    from './components/case_detail/case.detail.component'
import { CaseCreationComponent } from './components/case_creation/case.creation.component';
import { CaseEditionComponent } from './components/case_edition/case.edition.component';
import { LoginComponent }        from './components/login/login.component';
import { AuthGuard }             from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'cases', component: CasesComponent, canActivate: [AuthGuard] },
  { path: 'cases/new', component: CaseCreationComponent, canActivate: [AuthGuard] },
  { path: 'cases/:id', component: CaseDetailComponent, canActivate: [AuthGuard] },
  { path: 'cases/:id/edit', component: CaseEditionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' } // otherwise redirect to home
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}