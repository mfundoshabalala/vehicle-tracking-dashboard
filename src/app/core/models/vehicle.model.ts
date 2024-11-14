export type VehicleStatus = 'in transit' | 'stopped' | 'parked';

export interface Vehicle {
  id: string;
  registration: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  status: VehicleStatus;
}

