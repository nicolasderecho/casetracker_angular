import { Injectable } from '@angular/core';
import { Headers, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { HttpService } from './http.service';
import { ApiUrl } from '../api';
import * as _ from "lodash";

@Injectable()
export class ResourceService {

    protected resourcesUrl: string;

    constructor(protected http: HttpService) { 
      this.resourcesUrl = ApiUrl.pathFor(this.resourcesName());
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };

    resourceName() :string {
        throw 'Subclass responsibility';
    };

    resourcesName() :string {
        return this.resourceName() + 's';
    };

    resourceDetail(resourceId: number): string {
        return this.resourcesUrl + "/" + resourceId;
    };

    find(resourceId: number): Promise<any> {
    return this.http.get(this.resourceDetail(resourceId))
                .toPromise()
                .catch(this.handleError);
    };

    all(searchObject: any): Promise<any> {
    let searchParams = new URLSearchParams();
    searchParams.set("search", JSON.stringify(searchObject || {}));
    return this.http.get(this.resourcesUrl, { params: searchParams })
                .toPromise().catch(this.handleError);
    };

    create(resourceParams: any): Promise<any> {
    return this.http.post(this.resourcesUrl,{[this.resourceName()]: resourceParams})
                .toPromise()
                .catch(this.handleError);    
    };

    update(resourceParams: any, resourceId: number): Promise<any> {
    return this.http.put(this.resourceDetail(resourceId),{[this.resourceName()]: resourceParams})
                .toPromise()
                .catch(this.handleError);
    };

    delete(resourceId: number): Promise<any>{
    return this.http.delete(this.resourceDetail(resourceId))
                .toPromise()
                .catch(this.handleError);
    }
}