import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudoClinico } from '../models/estudo.model'; 

@Injectable({
  providedIn: 'root'
})
export class EstudoClinicoService {
  private apiUrl = '/api';
  constructor(private http: HttpClient) {}

  
  buscarPorId(id: number): Observable<EstudoClinico> {
    return this.http.get<EstudoClinico>(`${this.apiUrl}/estudos/${id}`);
  }

  buscarEstudosCompativeis(pacienteId: number): Observable<EstudoClinico[]> {
    return this.http.get<EstudoClinico[]>(`${this.apiUrl}/pacientes/estudos-compativeis/${pacienteId}`);
  }
  
  criarEstudo(estudo: EstudoClinico): Observable<EstudoClinico> {
    return this.http.post<EstudoClinico>(`${this.apiUrl}/estudos`, estudo);
  }

  deletarEstudo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/estudos/${id}`);
  }

  atualizarEstudo(id: number, estudo: EstudoClinico): Observable<EstudoClinico> {
  return this.http.put<EstudoClinico>(`${this.apiUrl}/estudos/${id}`, estudo);
}
}