import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalhes-estudo',
  templateUrl: './detalhes-estudo.component.html',
  styleUrls: ['./detalhes-estudo.component.scss'], 
  imports: [CommonModule,RouterLink]
})
export class DetalhesEstudoComponent implements OnInit {
  estudo: any;
  Id!: number;
  apiUrl = '/api/estudos';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.Id = Number (this.route.snapshot.paramMap.get('id'));
    console.log('ngOnInit chamado. ID:', this.Id);
    this.buscarEstudo();
  }

  buscarEstudo(): void {
  this.http.get(`/api/estudos/${this.Id}`).subscribe(
    (data: any) => {
      console.log('Estudo recebido:', data);
      this.estudo = data;
    },
    (error) => {
      console.error('Erro ao buscar estudo:', error);
    }
  );
}
  excluirEstudo(): void {
    this.http.delete(`${this.apiUrl}/${this.Id}`).subscribe(
      () => {
        console.log('Estudo excluído com sucesso');
        this.router.navigate(['/centro-home', this.estudo.idCentro]);
      },
      (error) => {
        console.error('Erro ao excluir estudo:', error);
      }
    );
  }
  editarEstudo(): void {
    this.router.navigate(['/centro', this.estudo.idCentro, 'criar-estudo'], { queryParams: { id: this.Id } });
  }
  voltar(): void {
    this.router.navigate(['/centro-home', this.estudo.idCentro]);
  }
}
