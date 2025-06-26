import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service'; 
import { EstudoClinico } from '../../../models/home-paciente.model'; 
import { ParticipacaoService } from '../../../services/participacao.service';


@Component({
  selector: 'app-detalhe-estudo-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe-estudo-paciente.component.html',
  styleUrl: './detalhe-estudo-paciente.component.scss'
})
export class DetalheEstudoPacienteComponent {
   estudo: EstudoClinico | undefined;
   loading = true;
  pacienteId: number = 18;

   constructor(
    private router: Router,
    private route: ActivatedRoute,
    private estudoService: EstudoClinicoService,
    private participacaoService: ParticipacaoService
   ){}

   ngOnInit(): void {
    const estudoId =  this.route.snapshot.paramMap.get('id');
    if (estudoId) {
      const estudoIdNumber = Number(estudoId);
      this.estudoService.buscarPorId(estudoIdNumber).subscribe({
        next: (data:any) => {
          if ((data as any).descrica) {
            data.descricao = (data as any).descrica;
          }
          this.estudo = data;
          this.loading = false;
        },
        error:(err:any) => {
          console.error('Erro ao carregar detalhes do estudo:', err);
          this.loading = false;
        }
      });
    }
  }

  solicitarSaida(): void {
  const participacaoId = this.estudo?.participacoes?.[0]?.id;

  if (!participacaoId) {
    alert('Não foi possível encontrar os dados da sua participação.');
    return;
  }

  const confirmou = confirm('Você tem certeza que deseja solicitar sua saída deste estudo? Esta ação não pode ser desfeita.');

  if (confirmou) {
    this.participacaoService.deletarParticipacao(participacaoId).subscribe({
      next: () => {
        alert('Sua participação no estudo foi removida com sucesso.');
        this.router.navigate(['/home-paciente', this.pacienteId]);
      },
      error: (err) => {
        console.error('Erro ao solicitar saída do estudo:', err);
        alert('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
      }
    });
  }
}
}
