import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FutureSelfService {

  constructor(private http: HttpClient) {}

  ask(question: string) {
    return this.http.post(
      'http://localhost:5000/api/future-self',
      { question }
    );
  }
}