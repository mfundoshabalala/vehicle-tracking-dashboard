import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavigationBarComponent],
  template: `
    <app-navigation-bar />
    <app-header />
  `,
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {}
