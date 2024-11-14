
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent implements OnChanges, AfterViewInit {
  private map!: L.Map;
  markers: L.Marker[] = [];
  @Input() vehicles: Vehicle[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicles'] && this.map) {
      this.clearMarkers();
      this.addMarkers();
      this.centerMap();
    }
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }

  private initializeMap() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/images/marker-icon-2x.png',
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png'
    });

    const baseURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer(baseURL).addTo(this.map);
  }

  private clearMarkers() {
    this.markers.forEach((marker) => marker.remove);
    this.markers = [];
  }

  private addMarkers() {
    this.vehicles.forEach((vehicle) => {
      const { latitude, longitude, registration, status, timestamp } = vehicle;
      if (longitude && latitude) {
        const marker = L.marker([latitude, longitude]);
        marker.bindPopup(`
          <strong>${registration}</strong><br>
          Status: ${status}<br>
          Last Updated: ${new Date(timestamp).toLocaleString()}
        `);
        marker.addTo(this.map);
        this.markers.push(marker);
      }
    });
  }

  private centerMap() {
    if(this.markers.length > 0) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds());
    }
  }
}
