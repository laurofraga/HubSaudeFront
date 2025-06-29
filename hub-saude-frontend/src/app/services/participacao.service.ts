import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Participacao } from '../models/home-paciente.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipacaoService {
  private apiUrl = '/api/participacoes';

  constructor(private http: HttpClient) { }

  deletarParticipacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  verificarParticipacao(pacienteId: number, estudoId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('pacienteId', pacienteId.toString())
      .set('estudoId', estudoId.toString());

    return this.http.get<Participacao>(`${this.apiUrl}/verificar`, { params }).pipe(
      
      map(() => true),
      
      catchError(() => of(false))
    );
  }
  criarParticipacao(dados: { pacienteId: number, estudoId: number }): Observable<Participacao> {
    return this.http.post<Participacao>(this.apiUrl, dados);
  }

}