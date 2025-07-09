import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, filter, take } from 'rxjs';
import { AuthService, UsuarioLogado } from './auth.service';

export const userDataResolver: ResolveFn<UsuarioLogado> = (route, state) => {
  const authService = inject(AuthService);

  return authService.usuarioAtual$.pipe(
    filter((usuario): usuario is UsuarioLogado => usuario !== null),
    take(1)
  );
};
