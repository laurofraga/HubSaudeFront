import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-criar-estudo',
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-estudo.component.html',
  styleUrls: ['./criar-estudo.component.scss']
})

export class CriarEstudoComponent implements OnInit{
 centroId!: number;

  estudo: any = {
    titulo: '',
    descrica: '',
    fase: '',
    dataInicio: '',
    dataFim: '',
    criteriosInclusao: [''],
    criteriosExclusao: [''],
}


 fases = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4'];

   constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.centroId = Number(this.route.snapshot.paramMap.get('id'));
  }
enviar() {
    const payload = {
      ...this.estudo,
      centroClinicoId: this.centroId
    };
  console.log('Payload enviado:', payload)

    this.http.post('/api/estudos', payload).subscribe({
      next: () => this.router.navigate(['/centro', this.centroId]),
      error: err => alert('Erro ao criar estudo: ' + err.message)
    });
  }

}