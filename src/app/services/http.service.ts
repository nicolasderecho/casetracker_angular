import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import * as _ from "lodash";

@Injectable()
export class HttpService {

    constructor(private http: Http) {  }

    defaultHeaders() :any {
        let headers = new Headers({ 'Accept': 'application/json'});
        if(localStorage.getItem("authToken")){
            headers.set("Authorization", "Bearer " + localStorage.getItem("authToken").replace(/"/g,""));
        }
        return headers;
    }

    mergeOptions(options: RequestOptionsArgs): RequestOptionsArgs{
        options = options || {}; 
        let finalOptions = _.cloneDeep(options);
        finalOptions.headers = this.defaultHeaders();
        let jsonHeaders = (options.headers || new Headers()).toJSON();
        _.each( Object.keys(jsonHeaders), (key) => finalOptions.headers.set(key, jsonHeaders[key]));
        return finalOptions;
    } 

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): any {
        return this.http.get(url,this.mergeOptions(options));
    };
    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: any, options?: RequestOptionsArgs): any{
        return this.http.post(url, body, this.mergeOptions(options));
    };
    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: any, options?: RequestOptionsArgs): any{
        return this.http.put(url, body, this.mergeOptions(options));
    };
    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): any{
        return this.http.delete(url,this.mergeOptions(options));
    };
    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: any, options?: RequestOptionsArgs): any{
        return this.http.patch(url, body, this.mergeOptions(options));
    };
    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): any{
        return this.http.head(url,this.mergeOptions(options));
    };

}