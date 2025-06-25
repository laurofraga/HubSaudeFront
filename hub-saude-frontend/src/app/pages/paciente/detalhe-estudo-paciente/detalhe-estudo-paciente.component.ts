import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service'; 
import { EstudoClinico } from '../../../models/home-paciente.model'; 



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

   constructor(
    private route: ActivatedRoute,
    private estudoService: EstudoClinicoService
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
}
