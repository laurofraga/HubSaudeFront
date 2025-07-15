import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CentroService } from '../../services/centro.service';
import { HomeCentroData } from '../../models/home-centro.model';
import { EstudoClinico } from '../../models/estudo.model'; 


@Component({
  selector   : 'app-home-centro',
  standalone : true,
  imports    : [CommonModule, RouterLink],
  templateUrl: './home-centro.component.html',
  styleUrls  : ['./home-centro.component.scss']
})
export class HomeCentroComponent implements OnInit {
  data: HomeCentroData ={
    centro : { id: 0, nome: '', email: '', endereco: '', telefone: '' },
    estudos: []
  };
  loading = true;

  constructor(private centroService: CentroService, private router: Router,
     private route: ActivatedRoute) {}

  ngOnInit(): void {
    const centroId = this.route.snapshot.paramMap.get('id');
    if (centroId) {
      this.centroService.getHomeCentroData(+centroId).subscribe({ 
        next: (res: HomeCentroData) => {
          const estudos = res.estudos.map((e: EstudoClinico) => ({
            ...e,
            descricao: (e as any).descrica ?? e.descricao
          }));
          this.data = { ...res, estudos };
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Erro ao carregar dados do centro:', err);
          this.loading = false;
        }
      });
    } else {
      console.error("Centro não encontrado na rota");
      this.loading = false;
    }
  }

  criarEstudo() {
     this.router.navigate([`/centro/${this.data.centro.id}/criar-estudo`]);         
  }

  verDetalhes(id: number) {
    this.router.navigate(['/estudos', id]);            
  }
}
