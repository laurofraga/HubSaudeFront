import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteService} from '../services/paciente.service';
import { HomePacienteData } from '../models/home-paciente.model';
import { EstudoClinico } from '../models/estudo.model';
import { Router } from '@angular/router';

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

  constructor(private pacienteService: PacienteService,private router: Router) {}
   ngOnInit(): void {
    const pacienteId = 18;
    this.pacienteService
      .getHomePacienteData(pacienteId)
      .subscribe({
        next: (res) => {
          const estudosCorrigidos = res.estudos.map(estudo => {
            return {
              ...estudo,
              descricao: estudo.descricao || (estudo as any).descrica || ''
            };
          });
          this.data = { ...res, estudos: estudosCorrigidos };
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar dados do paciente:', err);
          this.loading = false;
        }
      });
  }

  verDetalhes(estudoId: number | undefined): void {
    if (estudoId) {
      this.router.navigate(['/meus-estudos', estudoId]);
    }
  }

  irParaPesquisa(): void {
    this.router.navigate(['/pesquisar-estudos']);
  }
}

