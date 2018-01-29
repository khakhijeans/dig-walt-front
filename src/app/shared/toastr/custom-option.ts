import { Injectable } from '@angular/core';
import { ToastOptions } from 'ng2-toastr';

@Injectable()
export class CustomOption extends ToastOptions {
    animate = 'flyRight';
    dismiss = 'auto';
    toastLife = 3000;
}