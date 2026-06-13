import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  getDailyReport() {
    return this.http.get(
      'http://localhost:5000/api/reports/daily'
    );
  }
}