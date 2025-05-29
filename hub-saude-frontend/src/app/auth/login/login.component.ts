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
      senha: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Login válido', this.loginForm.value);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.senha, 'centro' /* ou 'paciente' conforme contexto */)
      .subscribe({
        next: (res) => {
          console.log('Login realizado:', res);
          
          localStorage.setItem('token', res.token);
          localStorage.setItem('tipo', res.tipo);
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
          alert('Usuário ou senha inválidos');
        }
      });
  }
  }
  

