import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ResourceService } from './resource.service';

@Injectable()
export class CasesService extends ResourceService{

  resourceName() :string {
    return 'case';
  };

  constructor(protected http: HttpService) {  
    super(http);
  }
  
}