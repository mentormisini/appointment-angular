import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PunetoretService {
  constructor(private http: HttpClient) { }
  getPunetoret() {
    return (this.http.get(`http://localhost:8080/terminet/shfaq-puntoret`, httpOptions))
      .pipe(map((data: any) => data));
  }
}
