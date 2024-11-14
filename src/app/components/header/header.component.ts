import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
  <header class="bg-white shadow text-gray-800">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-wrap justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div class="space-x-4">
        <button type="button" [disabled]="!showMap" (click)="toggleShowMap(false)">List View</button>
        <button type="button" [disabled]="showMap" (click)="toggleShowMap(true)">Map View</button>
      </div>
    </div>
  </header>
  `
})
export class HeaderComponent implements OnInit {
  showMap = false;

  private mapService = inject(MapService);

  ngOnInit() {
    this.mapService.showMap$.subscribe(value => this.showMap = value);
  }

  toggleShowMap(value: boolean) {
    this.mapService.setShowMap(value);
  }
}
