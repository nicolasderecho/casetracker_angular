import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ResourceService } from './resource.service';

@Injectable()
export class CommentsService extends ResourceService{
  
  resourceName() :string {
    return 'comment';
  };

}