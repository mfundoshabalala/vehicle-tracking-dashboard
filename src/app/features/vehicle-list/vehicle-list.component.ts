import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent  {
  @Input() vehicles: Vehicle[] = [];
  @Output() vehicleSelected = new EventEmitter<Vehicle>();

  onVehicleSelect(vehicle: Vehicle) {
    this.vehicleSelected.emit(vehicle);
  }
}
