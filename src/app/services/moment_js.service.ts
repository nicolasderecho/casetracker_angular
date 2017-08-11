import { Injectable } from '@angular/core';
import * as moment from 'moment'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private jwtHelper: JwtHelper) { }

    login(email: string, password: string) {
        return this.http.post(ApiUrl.pathFor('sessions'), { user: { email: email || '', password: password || '' } } )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                if (data && data.user && data.auth_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    localStorage.setItem('authToken', JSON.stringify(data.auth_token));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
    }

    userToken() {
        return (localStorage.getItem("authToken") || "").replace(/"/g,"") || "";
    }

    userTokenIsExpired() {
        return this.jwtHelper.isTokenExpired(this.userToken());
    }

    userSignedIn() {
        return !!this.userToken() && !this.userTokenIsExpired();
    }

    currentUser() {
        return JSON.parse(localStorage.getItem("currentUser") || "{}");
    }

}