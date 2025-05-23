import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  
  this.registerForm = this.fb.group({
  tipo: ['paciente', Validators.required],
  nome: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],  // <-- aqui
  senha: ['', [Validators.required, Validators.minLength(6)]],
  confirmSenha: ['', Validators.required]
}, {
  validators: this.mustMatch('senha', 'confirmSenha')
});

  
}

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
  this.submitted = true;

  if (this.registerForm.invalid) {
    return;
  }

  const { tipo, nome, email, senha } = this.registerForm.value;

  if (tipo === 'paciente') {
    this.authService.registerPaciente(nome, email, senha).subscribe({
      next: (res) => {
        console.log('Paciente cadastrado com sucesso:', res);
      },
      error: (err) => {
        console.error('Erro ao cadastrar paciente:', err);
      }
    });
  } else if (tipo === 'centro') {
    this.authService.registerCentro(nome, email, senha).subscribe({
      next: (res) => {
        console.log('Centro cadastrado com sucesso:', res);
      },
      error: (err) => {
        console.error('Erro ao cadastrar centro:', err);
      }
    });
  }

  console.log('Cadastro válido', this.registerForm.value);
}

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
}
