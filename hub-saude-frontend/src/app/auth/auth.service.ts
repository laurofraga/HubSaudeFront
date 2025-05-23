import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
 
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '/api/auth';  

  constructor(private http: HttpClient) { }

  login(email: string, senha: string, tipo: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, senha, tipo });
  }

  registerPaciente(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register/paciente`, { nome, email, senha });
  }

  registerCentro(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register/centro`, { nome, email, senha });
  }
}
