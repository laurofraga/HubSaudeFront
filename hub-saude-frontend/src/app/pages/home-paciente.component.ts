import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteService} from '../services/paciente.service';
import { HomePacienteData } from '../models/home-paciente.model';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-home-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-paciente.component.html',
  styleUrl: './home-paciente.component.scss'
})

export class HomePacienteComponent implements OnInit {
  data!: HomePacienteData;
  loading = true;

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.data['usuario']?.id;

    if (pacienteId) {
      this.carregarDados(pacienteId);
    } else {
      console.error("Resolver não forneceu dados do usuário. Redirecionando para login.");
      this.router.navigate(['/login']);
    }
  }
  carregarDados(pacienteId: number): void {
    this.pacienteService
      .getHomePacienteData(pacienteId)
      .subscribe({
        next: (res) => {
          this.data = res;
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

