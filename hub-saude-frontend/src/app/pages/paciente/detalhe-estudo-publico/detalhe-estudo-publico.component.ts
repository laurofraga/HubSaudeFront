import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {  Participacao } from '../../../models/home-paciente.model';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service';
import { ParticipacaoService } from '../../../services/participacao.service';
import { EstudoClinico } from '../../../models/estudo.model';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-detalhe-estudo-publico',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe-estudo-publico.component.html',
  styleUrl: './detalhe-estudo-publico.component.scss'
})
export class DetalheEstudoPublicoComponent  {
   estudo: EstudoClinico | undefined;
  loading = true;
  pacienteIdLogado: number | null = null;
  pacienteId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudoService: EstudoClinicoService,
    private participacaoService: ParticipacaoService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.usuarioAtual$.subscribe(usuario => {
      if (usuario && usuario.tipo === 'paciente') {
        this.pacienteIdLogado = usuario.id;
        this.pacienteId = usuario.id; 
      }
    });
    const estudoId = this.route.snapshot.paramMap.get('id');
    if (estudoId) {
      this.estudoService.buscarPorId(+estudoId).subscribe({
        next: (data) => {
          if (data) {
            const descricaoCorrigida = data.descricao || (data as any).descrica || '';
            this.estudo = { ...data, descricao: descricaoCorrigida };
          }
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Erro ao buscar detalhes do estudo:', err);
          this.loading = false;
        }
      });
    }
  }

  solicitarParticipacao(): void{
    if (!this.estudo?.id || !this.pacienteIdLogado) {
      alert("Não foi possível identificar o estudo ou o paciente logado.");
      return;
    }
    const dadosParticipacao = {
      pacienteId: this.pacienteIdLogado, 
      estudoId: this.estudo.id,
    };
    this.participacaoService.criarParticipacao(dadosParticipacao).subscribe({
      next: (novaParticipacao: Participacao) => {
        alert('Parabéns! Sua inscrição no estudo foi realizada com sucesso.');
        this.router.navigate(['/home-paciente', this.pacienteIdLogado]);
      },
      error: (err: any) => {
        console.error('Erro ao inscrever no estudo:', err);
        alert(`Erro ao realizar inscrição: ${err.error.message || 'Tente novamente.'}`);
      }
    });
  }
}
