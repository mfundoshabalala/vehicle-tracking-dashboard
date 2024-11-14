import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
  <footer>&copy; 2024 TrackFleet, Inc. All rights reserved.</footer>
  `,
  styles: `
  :host {
    @apply w-full p-4 text-center bg-gradient-to-tl from-slate-800 to-slate-900 text-white;
  }
  `
})
export class FooterComponent {}
