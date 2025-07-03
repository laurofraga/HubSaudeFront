import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HomePacienteData, Paciente } from "../models/home-paciente.model";


@Injectable({
  providedIn: 'root'
})

export class PacienteService {
  private baseUrl = '/api/pacientes';


  constructor(private http: HttpClient) {}

  getHomePacienteData(pacienteId: number): Observable<HomePacienteData> {
     return this.http.get<HomePacienteData>(`${this.baseUrl}/home/${pacienteId}`);
  }

  buscarPacientePorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/${id}`);
  }

  
  atualizarPaciente(id: number, dadosPaciente: Partial<Paciente>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseUrl}/${id}`, dadosPaciente);
  }

}