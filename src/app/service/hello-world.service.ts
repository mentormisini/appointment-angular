import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean{

  constructor(public message:string){

  }
}
@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldService(){
   return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
   
  }

  executeHelloWorldServiceWithPathVariable(name) {
    let basicAuthHeaderString = this.createBasicAuthHttpHeader();

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean',
    {headers});
  }

  createBasicAuthHttpHeader(){
    let username = 'user';
    let password = 'dommy';
    let bacisAuthHeader = 'Basic '+ window.btoa(username +':' +password);
    return bacisAuthHeader;
  }
}
