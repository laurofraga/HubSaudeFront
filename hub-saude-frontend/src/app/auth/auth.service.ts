import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  tipo: string;
  user: {
    id: number;
  };
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

  constructor(private http: HttpClient) { }

  login(email: string, senha: string, tipo: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, senha, tipo });
  }

 registerPaciente(data: PacienteRegister): Observable<any> {
  return this.http.post(`${this.baseUrl}/register/paciente`, data);
}

registerCentro(data: CentroRegister): Observable<any> {
  return this.http.post(`${this.baseUrl}/register/centro`, data);
}
}
