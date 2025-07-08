import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface UserData {
  id: number;
  nome: string;
}


export interface LoginResponse {
  token: string;
  tipo: 'paciente' | 'centro';
  user: UserData;
}


export interface UsuarioLogado {
  id: number;
  nome: string;
  tipo: 'paciente' | 'centro';
  token: string; 
}

export  interface PacienteRegister {
  nome: string;
  idade: number;        
  sexo: 'M' | 'F';
  email: string;
  senha: string;
  condicoes: string[];
  endereco: string;
}

export interface CentroRegister {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  telefone: string;
}


@Injectable({providedIn: 'root'})

export class AuthService {
  private baseUrl = '/api/auth'; 
  
  private usuarioAtualSubject = new BehaviorSubject<UsuarioLogado | null>(null);
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

   constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.carregarUsuarioDoStorage();
  }

 login(credentials: { email: string, senha: string, tipo: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        const usuarioParaSalvar: UsuarioLogado = {
          id: response.user.id,
          nome: response.user.nome,
          tipo: response.tipo,
          token: response.token
        };

        
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioParaSalvar));
        }
        console.log('[AuthService] Anunciando novo login para:', usuarioParaSalvar.nome);
        this.usuarioAtualSubject.next(usuarioParaSalvar);
      })
    );
  }

   logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuarioLogado');
    }
    this.usuarioAtualSubject.next(null);
  }
  private carregarUsuarioDoStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioJson = localStorage.getItem('usuarioLogado');
      if (usuarioJson) {
        const usuario: UsuarioLogado = JSON.parse(usuarioJson);
        this.usuarioAtualSubject.next(usuario);
      }
    }
  }

 registerPaciente(data: PacienteRegister): Observable<any> {
  return this.http.post(`${this.baseUrl}/register/paciente`, data);
}

registerCentro(data: CentroRegister): Observable<any> {
  return this.http.post(`${this.baseUrl}/register/centro`, data);
}

public getUsuarioAtualValue(): UsuarioLogado | null {
  return this.usuarioAtualSubject.getValue();
}
}
