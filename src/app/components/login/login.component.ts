import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { WindowRef } from '../../services/window_ref.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.pug',
  styles: [require('./login.component.scss').toString()]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading: boolean = false;
    wrongSubmit: boolean = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private windowService: WindowRef) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.wrongSubmit = false;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    window.location.href = window.location.origin + (this.returnUrl || "/home");
                    //this.router.navigate([this.returnUrl || '/home' ]);
                },
                error => {
                    this.windowService.nativeWindow.console.log(error._body);
                    this.loading = false;
                    this.wrongSubmit = true;
                });
    }
}
