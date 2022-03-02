import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class SherbimetBean{

  constructor(public sherbimet:string[]){

  }
}
@Injectable({
  providedIn: 'root'
})
export class SherbimetService {

  constructor(private http: HttpClient) {
  }
  getSherbimet() {
    return (this.http.get(`http://localhost:8080/terminet/shfaq-sherbimet`, httpOptions))
      .pipe(map((data: any) =>
        data));
  }
}
