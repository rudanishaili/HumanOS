import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsightService {

  constructor(private http: HttpClient) {}

  getInsight() {
    return this.http.get(
      'http://localhost:5000/api/insights'
    );
  }

}