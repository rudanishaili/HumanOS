import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private http: HttpClient
  ) {}

  getMetrics() {
    return this.http.get(
      'http://localhost:5000/api/system'
    );
  }
}