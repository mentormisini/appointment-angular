import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return (this.http.get('http://localhost:8080/api/auth/terminet-lira')).pipe(map((data: any)=>
    data.oraretLira));
    

    //console.log(a);
  
  }
}
