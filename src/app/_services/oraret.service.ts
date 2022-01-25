import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class OraretBean{

  constructor(public oraret:string[]){

  }
}

@Injectable({
  providedIn: 'root'
})
export class OraretService {

  constructor(private http: HttpClient) { }

  getOraret() {
    return this.http.get<OraretBean>('http://localhost:8080/api/auth/terminet-lira');
  
  }
}
