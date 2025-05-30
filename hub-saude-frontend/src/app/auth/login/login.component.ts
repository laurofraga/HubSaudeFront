import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
      tipo: ['paciente', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Login válido', this.loginForm.value);

   const { email, senha, tipo } = this.loginForm.value;
    this.authService.login(email, senha, tipo)
      .subscribe({
        next: (res) => {
         
          localStorage.setItem('token', res.token);
          localStorage.setItem('tipo', res.tipo);
          
          console.log('Login realizado:', res);
         if (res.tipo === 'centro') {
          this.router.navigate([`/centro-home/${res.user.id}`]);
        } else if (res.tipo === 'paciente') {
          this.router.navigate([`/home-paciente/${res.user.id}`]);
        } else {
          this.router.navigate(['/home']); 
        }
      },
      
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Usuário ou senha inválidos');
      }
    });
}
} 

