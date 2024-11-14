import { Component, Input } from '@angular/core';
import { VehicleStatus } from '../../core/models/vehicle.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="flex items-center space-x-2 text-gray-800">
    <span class="h-2 w-2 rounded-full motion-preset-pulse motion-duration-1500 gradient-dot"
    [ngClass]="{
      'bg-green-gradient': status === 'in transit',
      'bg-yellow-gradient': status === 'stopped',
      'bg-red-gradient': status === 'parked'
    }"></span>
    <span class="text-sm font-medium capitalize">{{ status }}</span>
  </div>
  `,
  styles: [`
  .gradient-dot {
    @apply motion-preset-pulse;
  }

  .bg-green-gradient {
    background: radial-gradient(circle, #10b981 30%, rgba(16, 185, 129, 0.3) 70%);
  }

  .bg-yellow-gradient {
    background: radial-gradient(circle, #f59e0b 30%, rgba(245, 158, 11, 0.3) 70%);
  }

  .bg-red-gradient {
    background: radial-gradient(circle, #ef4444 30%, rgba(239, 68, 68, 0.3) 70%);
  }
  `]
})
export class StatusIndicatorComponent {
  @Input() status: VehicleStatus = 'stopped';
}
