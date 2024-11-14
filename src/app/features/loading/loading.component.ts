import { Component, EventEmitter, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [LottieComponent],
  template: `
  <div class="animation-container">
    <ng-lottie
      [options]="lottieConfig"
      (animationCreated)="animationCreated($event)"
      (animationComplete)="hideAnimation()">
    </ng-lottie>
    <!-- <div class="font-medium text-3xl capitalize">loading...</div> -->
  </div>
  `,
  styles: [`
  :host {
    @apply h-full;
  }
  .animation-container {
    @apply h-full flex z-50 max-w-md mx-auto;
  }
  `]
})
export class LoadingComponent {
  @Output() animationDone = new EventEmitter<boolean>();

  protected lottieConfig: AnimationOptions = {
    path: '/assets/animations/loading.json',
    loop: true
  }

  protected hideAnimation(): void {
    this.animationDone.emit(true);
  }

  protected animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
