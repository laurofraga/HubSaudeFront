import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, filter, take } from 'rxjs';
import { AuthService, UsuarioLogado } from './auth.service';

// Este resolver garante que a rota só será ativada quando houver um usuário logado.
export const userDataResolver: ResolveFn<UsuarioLogado> = (route, state) => {
  const authService = inject(AuthService);

  return authService.usuarioAtual$.pipe(
    // O 'filter' é a chave: ele ignora o valor inicial 'null' e espera
    // até que o AuthService emita um objeto de usuário válido.
    filter((usuario): usuario is UsuarioLogado => usuario !== null),

    // 'take(1)' garante que, assim que recebermos o primeiro usuário válido,
    // o resolver completa e a navegação prossegue.
    take(1)
  );
};
