import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr = inject(ToastrService);
  return next(req).pipe(catchError((error) => {
    toastr.error(error.error?.message || 'An unexpected error occurred. Please try again later.', 'Error');
    return throwError(() => error);
  }));
};
