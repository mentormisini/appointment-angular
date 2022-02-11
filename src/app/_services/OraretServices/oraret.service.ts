import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = 'http://localhost:8080/terminet/krijo-termin';


export class OraretBean{

  constructor(public oraret:string[]){

  }
}

@Injectable({
  providedIn: 'root'
})
export class OraretService {


  constructor(private http: HttpClient) { }

  getOraret(selected) {
    return (this.http.get(`http://localhost:8080/terminet/merr-terminet-lira/${selected}`, httpOptions))
    .pipe(map((data: any)=>
    data));
  }



}
