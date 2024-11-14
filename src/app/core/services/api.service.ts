import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private vehicleSubject = new BehaviorSubject<Vehicle[]>([]);
  private vehicles$ = this.vehicleSubject.asObservable();
  private mockDataUrl = 'assets/data/mock-data.json';

  constructor(private http: HttpClient) {
    this.startSimulatingMovement();
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Vehicle[]>(this.mockDataUrl).subscribe({
      next: (data) => this.vehicleSubject.next(data),
      error: (err) => console.error('Error loading mock data:', err)
    });
  }

  get(): Observable<Vehicle[]> {
    return this.vehicles$;
  }

  private startSimulatingMovement() {
    setInterval(() => {
      const vehicles = this.vehicleSubject.value.map(vehicle => {
        const updatedVehicle = {
          ...vehicle,
          latitude: this.adjustCoordinate(vehicle.latitude),
          longitude: this.adjustCoordinate(vehicle.longitude),
          timestamp: new Date()
        };
        return updatedVehicle;
      });

      this.vehicleSubject.next(vehicles);
    }, 30000);
  }

  private adjustCoordinate(coordinate: number): number {
    const movementFactor = 0.01;
    const randomMovement = (Math.random() - 0.5) * movementFactor;
    return coordinate + randomMovement;
  }
}
