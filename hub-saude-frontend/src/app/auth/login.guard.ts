import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.usuarioAtual$.pipe(
    take(1),
    map(usuario => {
      if (usuario) {
        if (usuario.tipo === 'paciente') {
          router.navigate(['/home-paciente', usuario.id]);
        } else if (usuario.tipo === 'centro') {
          router.navigate(['/centro-home', usuario.id]);
        }
        return false;
      }
      return true; 
    })
  );
};