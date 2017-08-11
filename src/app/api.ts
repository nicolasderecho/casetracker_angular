import { environment } from '../environments/environment';
//const url = process.env.API_URL;//'http://localhost:3000/api';

console.log(environment.apiUrl);

export const ApiUrl = {
  pathFor: function(...args: string[]) { 
    return [environment.apiUrl].concat(args).join("/"); 
  }
};


