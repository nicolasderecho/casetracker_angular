import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { ApiUrl } from '../api';

@Injectable()
export class CasesService {
  private casesUrl =  ApiUrl.pathFor('cases');

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };

  private headers = new Headers({'Accept': 'application/json'});
  constructor(private http: Http) {  }
  
  findCase(caseId: number): Promise<any> {
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.get(this.casesUrl + "/" + caseId,{headers: this.headers})
               .toPromise()
               .catch(this.handleError);
  };

  getCases(searchObject: any): Promise<any> {
    let searchParams = new URLSearchParams();
    searchParams.set("search", JSON.stringify(searchObject || {}));
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.get(this.casesUrl,{headers: this.headers, params: searchParams})
               .toPromise().catch(this.handleError);
  };

  createCase(caseParams: any): Promise<any> {
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.post(this.casesUrl,{case: caseParams},{headers: this.headers})
               .toPromise()
               .catch(this.handleError);    
  };

  updateCase(caseParams: any, caseId: number): Promise<any> {
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.put(this.casesUrl + "/" + caseId,{case: caseParams},{headers: this.headers})
               .toPromise()
               .catch(this.handleError);
  };

  deleteCase(caseId: number): Promise<any>{
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.delete(this.casesUrl + "/" + caseId,{headers: this.headers})
               .toPromise()
               .catch(this.handleError);
  }

}