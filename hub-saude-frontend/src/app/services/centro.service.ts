import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeCentroData } from '../models/home-centro.model';

@Injectable({ providedIn: 'root' })
export class CentroService {
  private baseUrl = '/api/centros';

  constructor(private http: HttpClient) {}

  getHomeCentroData(id: number): Observable<HomeCentroData> {
    return this.http.get<HomeCentroData>(`${this.baseUrl}/home/${id}`);
  }
}
