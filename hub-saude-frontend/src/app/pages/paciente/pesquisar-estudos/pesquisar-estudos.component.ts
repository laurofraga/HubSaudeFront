import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service'; 
import { EstudoClinico } from '../../../models/estudo.model';
import { ParticipacaoService } from '../../../services/participacao.service';
import { AuthService } from '../../../auth/auth.service';

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
  pacienteIdLogado: number | null = null;
  

  constructor(
    private estudoService: EstudoClinicoService,
    private authService: AuthService,
    private participacaoService: ParticipacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.usuarioAtual$.subscribe(usuario => {
      if (usuario && usuario.tipo === 'paciente') {
        this.pacienteIdLogado = usuario.id;
        this.carregarEstudosCompativeis(this.pacienteIdLogado);
      } else {
        this.loading = false;
        console.error("Nenhum paciente logado para buscar estudos.");
        this.router.navigate(['/login']);
      }
    });
  }

  carregarEstudosCompativeis(pacienteId: number): void {
    this.estudoService.buscarEstudosCompativeis(pacienteId).subscribe({
      next: (data) => {
        this.estudosCompativeis = data.map(estudo => ({
          ...estudo,
          descricao: estudo.descricao || (estudo as any).descrica
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar estudos compatíveis:', err);
        this.loading = false;
      }
    });
  }
}