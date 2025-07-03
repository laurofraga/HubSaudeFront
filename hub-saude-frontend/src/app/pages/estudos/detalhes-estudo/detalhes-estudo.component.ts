import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { EstudoClinico } from '../../../models/estudo.model';
import { EstudoClinicoService } from '../../../services/estudo-clinico.service';

@Component({
  selector: 'app-detalhes-estudo',
  standalone : true,
  templateUrl: './detalhes-estudo.component.html',
  styleUrls: ['./detalhes-estudo.component.scss'], 
  imports: [CommonModule,RouterLink]
})
export class DetalhesEstudoComponent implements OnInit {
  estudo: EstudoClinico | undefined;
  loading = true;
  private estudoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudoService: EstudoClinicoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam){
      this.estudoId = +idParam;
      this.buscarEstudo();
    }
    
  }

  buscarEstudo(): void {
  if (this.estudoId) {
      this.estudoService.buscarPorId(this.estudoId).subscribe({
        next: (data) => {
          this.estudo = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar estudo:', err);
          this.loading = false;
        }
      });
    }
}

  excluirEstudo(): void {
     if (!this.estudoId) {
      alert("ID do estudo não encontrado para exclusão.");
      return;
    }
    const confirmou = confirm('Você tem certeza que deseja excluir este estudo?');
    if (confirmou) {
      this.estudoService.deletarEstudo(this.estudoId).subscribe({
        next: () => {
          alert('Estudo excluído com sucesso');
          const centroId = this.estudo?.centroClinico?.id;
          if (centroId) {
            this.router.navigate(['/centro-home', centroId]);
          } else {
            this.router.navigate(['/']); 
          }
        },
        error: (err) => {
          console.error('Erro ao excluir estudo:', err);
          alert('Ocorreu um erro ao excluir o estudo.');
        }
      });
    }
  }
 
    voltar(): void {
    
    const centroId = this.estudo?.centroClinico?.id;

    if (centroId) {
      
      this.router.navigate(['/centro-home', centroId]);
    } else {
      
      console.error("Não foi possível determinar o ID do centro clínico para voltar.");
      
    }
  }
  }

