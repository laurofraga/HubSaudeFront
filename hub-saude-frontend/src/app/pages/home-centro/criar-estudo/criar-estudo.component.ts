import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service';
import { EstudoClinico } from '../../../models/estudo.model';

@Component({
  selector: 'app-criar-estudo',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-estudo.component.html',
  styleUrls: ['./criar-estudo.component.scss']
})

export class CriarEstudoComponent implements OnInit{


   estudo: EstudoClinico = {
    titulo: '',
    descricao: '',
    fase: '',
    dataInicio: '',
    dataFim: '',
    criteriosInclusao: [''],
    criteriosExclusao: ['']
  };


 fases = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4'];
 
 isEditMode = false;
  private estudoId: number | null = null;
  private centroId: number | null = null;

   constructor(
     private estudoService: EstudoClinicoService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.estudoId = +idParam;
      this.carregarDadosDoEstudo(this.estudoId);
    }
  }
   carregarDadosDoEstudo(id: number): void {
    this.estudoService.buscarPorId(id).subscribe(data => {
      if (data) {
        data.dataInicio = data.dataInicio ? new Date(data.dataInicio).toISOString().split('T')[0] : '';
        data.dataFim = data.dataFim ? new Date(data.dataFim).toISOString().split('T')[0] : '';
        
        data.descricao = data.descricao || (data as any).descrica || '';
     
        if (!data.criteriosInclusao || data.criteriosInclusao.length === 0) {
          data.criteriosInclusao = [''];
        }
        if (!data.criteriosExclusao || data.criteriosExclusao.length === 0) {
          data.criteriosExclusao = [''];
        }
      }
      this.estudo = data;
    });
  }


   adicionarCriterio(tipo: 'inclusao' | 'exclusao'): void {
    if (tipo === 'inclusao') {
      this.estudo.criteriosInclusao?.push('');
    } else {
      this.estudo.criteriosExclusao?.push('');
    }
  }
  removerCriterio(tipo: 'inclusao' | 'exclusao', index: number): void {
    if (tipo === 'inclusao' && this.estudo.criteriosInclusao && this.estudo.criteriosInclusao.length > 1) {
      this.estudo.criteriosInclusao.splice(index, 1);
    } else if (tipo === 'exclusao' && this.estudo.criteriosExclusao && this.estudo.criteriosExclusao.length > 1) {
      this.estudo.criteriosExclusao.splice(index, 1);
    }
  }
  
   trackByFn(index: any, item: any): any {
    return index;
  }

enviar(): void {
    const payload: Partial<EstudoClinico> = {
      titulo: this.estudo.titulo,
      descricao: this.estudo.descricao, 
      fase: this.estudo.fase,
      dataInicio: this.estudo.dataInicio,
      dataFim: this.estudo.dataFim,
      criteriosInclusao: this.estudo.criteriosInclusao,
      criteriosExclusao: this.estudo.criteriosExclusao,
    };

    if (this.isEditMode && this.estudoId) {
      this.estudoService.atualizarEstudo(this.estudoId, payload).subscribe({
        next: () => {
          alert('Estudo atualizado com sucesso!');
          this.router.navigate(['/estudos', this.estudoId]);
        },
        error: (err) => console.error('Erro ao atualizar', err)
      });
    } else {
      this.estudoService.criarEstudo(payload).subscribe({
        next: (novoEstudo) => {
          alert('Estudo criado com sucesso!');
          if (novoEstudo?.centroClinico?.id) {
            this.router.navigate(['/centro-home', novoEstudo.centroClinico.id]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => console.error('Erro ao criar estudo:', err)
      });
    }
  }
}
