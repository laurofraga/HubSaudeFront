import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, UsuarioLogado } from '../../auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  usuario$!: Observable<UsuarioLogado | null>;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  this.usuario$ = this.authService.usuarioAtual$;
  }

  logout(): void {
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
