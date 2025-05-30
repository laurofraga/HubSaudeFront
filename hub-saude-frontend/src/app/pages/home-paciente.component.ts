import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteService} from '../services/paciente.service';
import { HomePacienteData, EstudoClinico } from '../models/home-paciente.model';

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
    const pacienteId = 18; 
    this.pacienteService
      .getHomePacienteData(pacienteId)
      .subscribe({
        next: (res) => {
          
          const estudos: EstudoClinico[] = res.estudos.map(e => ({
            ...e,
            descricao: (e as any).descrica ?? e.descricao   
          })) as EstudoClinico[];

          this.data = { ...res, estudos };
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar dados do paciente:', err);
          this.loading = false;
        }
      });
  }
}
