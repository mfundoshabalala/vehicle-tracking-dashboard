import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private apiService: ApiService) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.apiService.get();
  }

  updateVehicle(id:string, updatedVehicle: Partial<Vehicle>) {
    return this.apiService.update(id, updatedVehicle);
  }
}
