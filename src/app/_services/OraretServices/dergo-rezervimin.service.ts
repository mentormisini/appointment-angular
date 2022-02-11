import { Injectable } from '@angular/core';
import {Observable, observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'http://localhost:8080/terminet/';
@Injectable({
  providedIn: 'root'
})

export class DergoRezerviminService {

  constructor(private http: HttpClient) {}

  postTermin(terminRequst3, terminiRequest1, terminiRequest2): Observable<any>{
    console.log("ora" + terminiRequest2.orarizgjedhur)
    console.log('data' + terminiRequest2.dataZgjedhur)
    return this.http.post(AUTH_API, {
      emri: terminiRequest1.emri,
      mbiemri: terminiRequest1.mbiemri,
      email: terminiRequest1.email,
      ora: terminiRequest2.orarizgjedhur,
      numri: terminiRequest1.numri,
      sherbimi: terminRequst3.sherbimiZgjedhur,
      puntori: terminRequst3.puntoriZgjedhur,
      data: terminiRequest2.dataZgjedhur

    }, httpOptions);

  }
}
