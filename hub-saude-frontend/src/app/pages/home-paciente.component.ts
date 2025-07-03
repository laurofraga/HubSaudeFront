import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PacienteService} from '../services/paciente.service';
import { HomePacienteData } from '../models/home-paciente.model';
import { EstudoClinico } from '../models/estudo.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UsuarioLogado } from '../auth/auth.service';


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
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.authService.usuarioAtual$.subscribe(usuario => {
      if (usuario && usuario.tipo === 'paciente') {
        this.carregarDados(usuario.id);
      } else {
        console.error("Nenhum paciente logado encontrado. Redirecionando para o login.");
        this.router.navigate(['/login']);
      }
    });
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

