import { Component } from '@angular/core';

import { NavigationComponent } from "../../components/navigation/navigation.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet,NavigationComponent, FooterComponent],
  template: `
    <app-navigation />
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </div>
    </main>
    <app-footer />
  `,
  styles: [`
  :host {
    @apply flex flex-col h-full;
  }

  :host > main {
    @apply flex-1;
  }
  `]
})
export class DashboardLayoutComponent {}
