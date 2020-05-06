import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemInfoService {

  constructor( private http: HttpClient ) { }

  public getFromAPI(): Observable<any>{
    return this.http.get(
      'http://localhost:4000',
      { responseType: 'json' }
    );
  }

}
