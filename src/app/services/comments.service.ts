import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { ApiUrl } from '../api';

@Injectable()
export class CommentsService {
  private commentsUrl =  ApiUrl.pathFor('comments');

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };

  private headers = new Headers({'Accept': 'application/json'});
  constructor(private http: Http) {  }
  
  findComment(commentId: number): Promise<any> {
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.get(this.commentsUrl + "/" + commentId,{headers: this.headers})
               .toPromise()
               .catch(this.handleError);
  };

  getComments(searchObject: any): Promise<any> {
    let searchParams = new URLSearchParams();
    searchParams.set("search", JSON.stringify(searchObject || {}));
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.get(this.commentsUrl,{headers: this.headers, params: searchParams})
               .toPromise().catch(this.handleError);
  };

  createComment(commentParams: any): Promise<any> {
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.post(this.commentsUrl,{comment: commentParams},{headers: this.headers})
               .toPromise()
               .catch(this.handleError);    
  };

  updateComment(commentParams: any, commentId: number): Promise<any> {
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.put(this.commentsUrl + "/" + commentId,{comment: commentParams},{headers: this.headers})
               .toPromise()
               .catch(this.handleError);
  };

  deleteComment(commentId: number): Promise<any>{
    this.headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
    return this.http.delete(this.commentsUrl + "/" + commentId,{headers: this.headers})
               .toPromise()
               .catch(this.handleError);
  }

}