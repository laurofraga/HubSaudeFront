import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EstudoClinico, Participacao } from '../../../models/home-paciente.model';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service';
import { ParticipacaoService } from '../../../services/participacao.service';


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
  pacienteIdLogado: number = 18;
   pacienteId: number = 18;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudoService: EstudoClinicoService,
    private participacaoService: ParticipacaoService
  ){}

  ngOnInit(): void {
    const estudoId = this.route.snapshot.paramMap.get('id')
    if (estudoId){
      this.estudoService.buscarPorId(+estudoId).subscribe({
        next: (data) => {
          console.log('Dados recebidos da API:', data);

          if (data) {
          const descricaoCorrigida = data.descricao || (data as any).descrica || '';
          this.estudo = { ...data, descricao: descricaoCorrigida };
        }
        
          this.estudo = data;
          this.loading = false;
        },
        error: (err: any) => {
          console.log('Erro ao buscar detalhes do estudo:', err);
          this.loading = false;
        }
      });
    }
  }
  solicitarParticipacao(): void{
    if (!this.estudo?.id) return;

    const dadosParticipacao = {
      pacienteId: this.pacienteIdLogado, 
      estudoId: this.estudo.id,
    };
    this.participacaoService.criarParticipacao(dadosParticipacao).subscribe({
      next:(novaParticipacao: Participacao) => {
        alert('Sua solicitação foi enviada com suceso!');
        this.router.navigate(['/meus-estudos', this.estudo?.id]);
      },
      error: (err:any) => {
        console.error ('erro ao solicitar participação:', err)
         alert(`Erro ao enviar solicitação: ${err.error.message || 'Tente novamente.'}`);
      }
    });
  }
}
