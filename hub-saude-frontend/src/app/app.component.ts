import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common'; 
import { filter, pairwise, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, NavbarComponent, CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit { 
  showNavbar = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.showNavbar = !(event.url === '/login' || event.url === '/register');
    });
  }
   ngOnInit(): void {
    this.authService.usuarioAtual$.pipe(
      tap(usuario => console.log('[AppComponent] Ouvi uma mudança de utilizador!', usuario)),
      pairwise()
    ).subscribe(([usuarioAnterior, usuarioAtual]) => {
      if (!usuarioAnterior && usuarioAtual) {
        console.log('Detectado login! AppComponent está a navegar...');
        if (usuarioAtual.tipo === 'paciente') {
          this.router.navigate(['/home-paciente', usuarioAtual.id]);
        } else if (usuarioAtual.tipo === 'centro') {
          this.router.navigate(['/centro-home', usuarioAtual.id]);
        }
      }
    });
  }
}