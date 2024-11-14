// dashboard.component.ts

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
    <app-vehicle-list [vehicles]="vehicles" (vehicleSelected)="centerMapOnVehicle($event)"></app-vehicle-list>
  </div>
  <div *ngIf="showMap" [@fadeInOut]>
    <app-map-view [vehicles]="showSingleVehicle ? [selectedVehicle] : vehicles" #vehicleMap></app-map-view>
  </div>
  `,
  styleUrls: ['./dashboard.component.scss'],
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
  selectedVehicle!: Vehicle;
  showSingleVehicle = false;

  @ViewChild('vehicleMap') vehicleMap!: MapViewComponent;

  private mapService = inject(MapService);
  private vehicleService = inject(VehicleService);

  ngOnInit() {
    this.vehicleService.getVehicleLocations().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });

    this.mapService.showMap$.subscribe((value) => this.showMap = value);
  }

  centerMapOnVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.showSingleVehicle = true;
    this.mapService.setShowMap(true);

    setTimeout(() => {
      this.vehicleMap?.centerOnLocation({ latitude: vehicle.latitude, longitude: vehicle.longitude });
    }, 0);
  }
}
