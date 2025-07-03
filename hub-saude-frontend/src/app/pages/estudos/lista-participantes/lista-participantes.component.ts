import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EstudoClinicoService, ParticipanteEstudo } from '../../../services/estudo-clinico.service';

@Component({
  selector: 'app-lista-participantes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.scss']
})
export class ListaParticipantesComponent implements OnInit {
  participantes: ParticipanteEstudo[] = [];
  loading = true;
  estudoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private estudoService: EstudoClinicoService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.estudoId = +idParam;
      this.estudoService.listarParticipantes(this.estudoId).subscribe({
        next: (data) => {
          this.participantes = data;
          this.loading = false;
        },
        error: (err) => {
          console.error("Erro ao carregar participantes:", err);
          this.loading = false;
        }
      });
    }
  }
}
