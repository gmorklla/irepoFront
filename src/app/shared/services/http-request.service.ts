import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
// Import RxJs required methods
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/retry';
import 'rxjs-compat/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/operator/toPromise';

@Injectable()
export class HttpRequestService {

  constructor(
    private http: Http
  ) { }

    // Standard get request
    getRequest(url: string, param: any) {
      const headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
      const params: URLSearchParams = new URLSearchParams();
      for (const key in param) {
          if (param.hasOwnProperty(key)) {
              const val = param[key];
              params.set(key, val);
          }
      }
      return this.http.get(url, { headers: headers, search: params })
          .map((res: Response) => res.json())
          .catch(err => {
              return Observable.throw(err.json());
          });
          // .finally(() => console.log('Finally http get request'));
  }

}
