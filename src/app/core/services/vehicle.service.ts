import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiService = inject(ApiService);

  getVehicleLocations(): Observable<Vehicle[]> {
    return this.apiService.get();
  }
}
