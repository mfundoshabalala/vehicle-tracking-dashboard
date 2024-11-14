import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{ visible: boolean, message: string }>({
    visible: false,
    message: ''
  });

  toast$ = this.toastSubject.asObservable();

  showToast(message: string): void {
    this.toastSubject.next({ visible: true, message });
    setTimeout(() => {
      this.toastSubject.next({ visible: false, message: '' });
    }, 5000);
  }
}
