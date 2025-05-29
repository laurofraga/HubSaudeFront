import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteService} from '../services/paciente.service';
import { HomePacienteData } from '../models/home-paciente.model';

@Component({
  selector: 'app-home-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-paciente.component.html',
  styleUrl: './home-paciente.component.scss'
})
export class HomePacienteComponent implements OnInit {
  data!: HomePacienteData;
  loading = true;

  constructor(private pacienteService: PacienteService) {}
  ngOnInit(): void {
    const pacienteId = 1
    this.pacienteService.getHomePacienteData(pacienteId).subscribe({
      next: (data: HomePacienteData) => {
        this.data = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar dados do paciente:', err);
        this.loading = false;
      }
    });
  }
} {

}
