import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) {}

  getTimeline() {
    return this.http.get('http://localhost:5000/api/timeline');
  }
}