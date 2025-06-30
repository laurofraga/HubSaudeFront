import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CentroService } from '../../services/centro.service';
import { HomeCentroData } from '../../models/home-centro.model';
import { EstudoClinico } from '../../models/estudo.model'; 


@Component({
  selector   : 'app-home-centro',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './home-centro.component.html',
  styleUrls  : ['./home-centro.component.scss']
})
export class HomeCentroComponent implements OnInit {
  data: HomeCentroData ={
    centro : { id: 0, nome: '', email: '', endereco: '', telefone: '' },
    estudos: []
  };
  loading = true;

  constructor(private centroService: CentroService, private router: Router) {}

  ngOnInit(): void {
    const centroId = 6; 
    this.centroService.getHomeCentroData(centroId).subscribe({
      next: (res: HomeCentroData) => {
        
        const estudos = res.estudos.map((e: EstudoClinico) => ({
          ...e,
          descricao: (e as any).descrica ?? e.descricao
        })) as EstudoClinico[];

        this.data = { ...res, estudos };
        this.loading = false;
      },
      error: (err: any) => { console.error(err); this.loading = false; }
    });
  }

  criarEstudo() {
      this.router.navigate([`/centro/${this.data.centro.id}/criar-estudo`]);         
  }

  verDetalhes(id: number) {
    this.router.navigate(['/estudos', id]);            
  }
}
