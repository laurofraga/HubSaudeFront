import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PacienteRegister } from '../auth.service';

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
  sexos = ['M', 'F'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      tipo: ['paciente', Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      endereco: ['', Validators.required]
    });

    this.applyTipoFields();
    this.registerForm.get('tipo')!.valueChanges.subscribe(() => this.applyTipoFields());
  }

  private applyTipoFields() {
    const tipo = this.registerForm.get('tipo')!.value;

    if (tipo === 'paciente' && !this.registerForm.contains('idade')) {
      this.registerForm.addControl('idade', this.fb.control('', [Validators.required, Validators.min(0)]));
      this.registerForm.addControl('sexo', this.fb.control('', Validators.required));
      this.registerForm.addControl('condicoes', this.fb.control('')); // string no input
    }

    if (tipo === 'centro' && !this.registerForm.contains('telefone')) {
      this.registerForm.addControl('telefone', this.fb.control('', Validators.required));
    }

    if (tipo === 'paciente' && this.registerForm.contains('telefone')) {
      this.registerForm.removeControl('telefone');
    }

    if (tipo === 'centro' && this.registerForm.contains('idade')) {
      ['idade', 'sexo', 'condicoes'].forEach(c => this.registerForm.removeControl(c));
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    const { tipo, ...formValues } = this.registerForm.value;

   if (tipo === 'paciente') {
  let condicoes = formValues.condicoes as any;
  if (typeof condicoes === 'string') {
    condicoes = condicoes.split(',').map((c: string) => c.trim()).filter(Boolean);
  }

  const idadeNumber = parseInt(formValues.idade, 10);
  if (isNaN(idadeNumber)) {
    alert('Digite uma idade válida.');
    return;
  }

  const payload: PacienteRegister = {
    nome: formValues.nome,
    email: formValues.email,
    senha: formValues.senha,
    idade: idadeNumber,
    sexo: formValues.sexo,
    condicoes,
    endereco: formValues.endereco,
  };
  

  this.authService.registerPaciente(payload).subscribe({
    next: res => console.log('Paciente cadastrado', res),
    error: err => console.error('Erro ao cadastrar paciente', err)
  });
}

     else if (tipo === 'centro') {
      const payload = {
        nome: formValues.nome,
        email: formValues.email,
        senha: formValues.senha,
        telefone: formValues.telefone,
        endereco: formValues.endereco,
      };
      console.log('Payload enviado:', payload);
      this.authService.registerCentro(payload).subscribe({
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
