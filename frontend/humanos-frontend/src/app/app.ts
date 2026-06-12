import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SystemService } from './services/system.service';
import { FutureSelfService } from './services/future-self.service';
import { TimelineService } from './services/timeline.service';
import { CommonModule } from '@angular/common';
import { InsightService } from './services/insight.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App implements OnInit {

  mentalCPU = 0;
  focusStability = 0;
  batteryRecovery = 0;
  systemTemperature = 0;
  timelineChats: any[] = [];
  timelineActivities: any[] = [];
  timelineEvents: any[] = [];
  humanOSScore = 0;
  systemInsight = '';

  futureResponse = '';

  temperatureLabel = 'Stable';

  constructor(
  private systemService: SystemService,
  private futureSelfService: FutureSelfService,
  private timelineService: TimelineService,
  private insightService: InsightService,
  private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMetrics();
    this.loadTimeline();
    this.loadInsight();

    setInterval(() => {
      this.loadMetrics();
    }, 5000);
  }

  loadMetrics(): void {
    this.systemService.getMetrics().subscribe({
      next: (data: any) => {
        this.mentalCPU = data.mentalCPU;
        this.focusStability = data.focusStability;
        this.batteryRecovery = data.batteryRecovery;
        this.systemTemperature = data.systemTemperature;
        this.humanOSScore = data.humanOSScore;

        this.temperatureLabel = this.getTemperatureLabel(
          data.systemTemperature
        );

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(
          'Failed to load HumanOS metrics:',
          error
        );
      }
    });
  }

  loadTimeline(): void {
  this.timelineService.getTimeline().subscribe({
    next: (data: any) => {
      this.timelineChats = data.chats;
      this.timelineActivities = data.activities;
      this.timelineEvents = data.events;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Timeline error:', error);
    }
  });
}

loadInsight(): void {
  this.insightService.getInsight().subscribe({
    next: (data: any) => {
      this.systemInsight = data.insight;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Insight error:', error);
    }
  });
}

  getTemperatureLabel(value: number): string {
    if (value >= 75) return 'Critical';
    if (value >= 55) return 'Warm';
    if (value >= 35) return 'Normal';
    return 'Cool';
  }

  askFutureSelf(question: string): void {
    console.log('BUTTON CLICKED');

    if (!question.trim()) return;

    this.futureResponse = 'Synchronizing with Future Self...';
    this.cdr.detectChanges();

    this.futureSelfService.ask(question).subscribe({
      next: (data: any) => {
        this.futureResponse = data.response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Future Self error:', error);
        this.futureResponse = 'Future Self connection failed.';
        this.cdr.detectChanges();
      }
    });
  }
}