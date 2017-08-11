import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticTool } from './services/analytic_tool.service';
import { AuthenticationService } from './services/authentication.service';
import { Http } from '@angular/http';
import { LoginComponent }        from './components/login/login.component';
import { CaseDetailComponent }    from './components/case_detail/case.detail.component'
import { ApiUrl } from './api';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'primeng/resources/primeng.min.css'
import 'primeng/resources/themes/bootstrap/theme.css'
import '../assets/css/styles.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.pug',
  styles: [require('./app.component.scss').toString()]
})
export class AppComponent { 

  private userFullName: string;

  onRouteChanges(routeData: any): void {
    if(routeData instanceof NavigationEnd){
      this.analyticTool.trackPage(routeData.url);
    }
  }

  constructor(private router: Router, private analyticTool: AnalyticTool, private http: Http, private authService: AuthenticationService) {
    router.events.subscribe(this.onRouteChanges.bind(this));
    let currentUser = this.authService.currentUser();
    this.userFullName = (currentUser.first_name || '') + ' ' + (currentUser.last_name || '');
  }

  userSignedIn(): boolean {
    return this.authService.userSignedIn();
  }

  logout(): void {
    this.authService.logout();
    //this.router.navigate(['/login']);
  }

}
