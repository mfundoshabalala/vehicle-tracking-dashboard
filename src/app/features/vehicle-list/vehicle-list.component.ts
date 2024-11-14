import { Component, Input, OnChanges } from '@angular/core';

import { StatusIndicatorComponent } from '../../components/status-indicator/status-indicator.component';
import { Vehicle } from '../../core/models/vehicle.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, StatusIndicatorComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnChanges {
  @Input() vehicles: Vehicle[] = [];

  protected headers:string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected rows: any[][] = [];

  ngOnChanges() {
    if (this.vehicles.length) {
      this.headers = Object.keys(this.vehicles[0]);
      this.rows = this.vehicles.map(vehicle => Object.values(vehicle));
    }
  }
}
