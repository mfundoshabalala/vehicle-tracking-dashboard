import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './features/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected showAnimation = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showAnimation = true;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.showAnimation = false;
        }, 1000);
      }
    });
  }

  protected onAnimationDone(): void {
    this.showAnimation = false;
  }
}
