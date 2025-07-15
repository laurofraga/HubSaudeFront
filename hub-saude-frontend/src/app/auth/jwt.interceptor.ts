import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('JwtInterceptor executado');
  const authService = inject(AuthService); 

  if (req.url.includes('/api/auth/login')) {
    return next(req);
  }

  return authService.usuarioAtual$.pipe(
    take(1),
    switchMap(usuario => {
      if (usuario && usuario.token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${usuario.token}`
          }
        });
        return next(authReq);
      } else {
        return next(req);
      }
    })
  );
};
