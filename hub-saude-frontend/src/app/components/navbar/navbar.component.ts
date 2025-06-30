import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Interface para simular nosso usuário logado
export interface UsuarioLogado {
  id: number;
  nome: string;
  tipo: 'paciente' | 'centro';
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  isLoggedIn = true; 
  usuario: UsuarioLogado | null = {
    id: 18,
    nome: 'Lauro Paciente',
    tipo: 'paciente' 
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }

  logout(): void {
    
    console.log('Fazendo logout...');
    this.isLoggedIn = false;
    this.usuario = null;
    this.router.navigate(['/login']);
  }
}
