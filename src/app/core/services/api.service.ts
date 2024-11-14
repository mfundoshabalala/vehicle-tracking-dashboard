import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private vehicles: Vehicle[] = [];

  private vehicleSubject = new BehaviorSubject<Vehicle[]>([]);
  private vehicles$ = this.vehicleSubject.asObservable();
  private mockDataUrl = 'assets/data/mock-data.json';

  constructor(private http: HttpClient) {
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

  update(id: string, updatedVehicle: Partial<Vehicle>): Observable<Vehicle> {
    const vehicles = this.vehicleSubject.value;
    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === id);
    if (vehicleIndex === -1) throw new Error("Vehicle not found");

    vehicles[vehicleIndex] = {
      ...vehicles[vehicleIndex],
      ...updatedVehicle,
      timestamp: updatedVehicle.timestamp || vehicles[vehicleIndex].timestamp,
    };
    this.vehicleSubject.next(vehicles);

    return of(vehicles[vehicleIndex]);
  }
}
