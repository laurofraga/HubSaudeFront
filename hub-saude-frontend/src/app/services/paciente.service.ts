import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HomePacienteData } from "../models/home-paciente.model";
import id from "@angular/common/locales/id";

@Injectable({
  providedIn: 'root'
})

export class PacienteService {
  private baseUrl = 'http://localhost:3000/pacientes/home'; 

  constructor(private http: HttpClient) {}

  
  getHomePacienteData(pacienteId: number): Observable<HomePacienteData> {
    return this.http.get<HomePacienteData>(`${this.baseUrl}/pacientes/${id}/home`);
  }
}