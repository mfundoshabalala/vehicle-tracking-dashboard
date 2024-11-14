import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { Vehicle } from '../../core/models/vehicle.model';
import { MapViewComponent } from '../../features/map-view/map-view.component';
import { VehicleListComponent } from "../../features/vehicle-list/vehicle-list.component";
import { VehicleService } from '../../core/services/vehicle.service';
import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MapViewComponent, VehicleListComponent],
  template: `
  <div *ngIf="!showMap" [@fadeInOut]>
    <app-vehicle-list [vehicles]="vehicles"></app-vehicle-list>
  </div>
  <div *ngIf="showMap" [@fadeInOut]>
    <app-map-view [vehicles]="vehicles"></app-map-view>
  </div>
  `,
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  showMap = false;
  protected vehicles: Vehicle[] = [];

  private mapService = inject(MapService);
  private vehicleService = inject(VehicleService);

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
    });

    this.mapService.showMap$.subscribe((value) => this.showMap = value);
  }
}
