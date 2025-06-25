import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service'; 
import { EstudoClinico } from '../../../models/home-paciente.model';

@Component({
  selector: 'app-pesquisar-estudos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pesquisar-estudos.component.html',
  styleUrl: './pesquisar-estudos.component.scss'
})
export class PesquisarEstudosComponent implements OnInit {
  estudosCompativeis: EstudoClinico[] = [];
  loading = true;
  private pacienteId = 18;

  constructor(private estudoService: EstudoClinicoService) {}

  ngOnInit(): void {
    this.estudoService.buscarEstudosCompativeis(this.pacienteId).subscribe({
      next: (data) => {
        this.estudosCompativeis = data.map(estudo => {
          const descricaoCorrigida = estudo.descricao ? estudo.descricao : (estudo as any).descrica;
          return {
            ...estudo,
            descricao: descricaoCorrigida
          };
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar estudos compatíveis:', err);
        this.loading = false;
      }
    });
  }
}
 