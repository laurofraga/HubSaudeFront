import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PacienteRegister, CentroRegister } from '../auth.service';
import { Paciente } from '../../models/home-paciente.model';
import { PacienteService } from '../../services/paciente.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CentroHome } from '../../models/home-centro.model';
import { CentroService } from '../../services/centro.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule,ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  sexos = ['M', 'F'];

  isEditMode = false;
  private idParaEditar: number | null = null;
  private tipoDeEdicao: 'paciente' | 'centro' | null = null;

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private pacienteService : PacienteService,
    private centroService: CentroService,
    private route : ActivatedRoute,
    private router : Router,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const url = this.router.url;

   if (idParam) {
  this.isEditMode = true;
  this.idParaEditar = +idParam; 
  this.initializeForm();

    if (url.includes('/paciente/editar')) {
      this.tipoDeEdicao = 'paciente';
      this.registerForm.get('tipo')?.setValue('paciente');
      this.carregarDadosDoPaciente(this.idParaEditar);
    } else if (url.includes('/centro/editar')) {
      this.tipoDeEdicao = 'centro';
      this.registerForm.get('tipo')?.setValue('centro');
      this.carregarDadosDoCentro(this.idParaEditar); 
    }
} else {
      this.isEditMode = false;
      this.initializeForm();
      this.applyTipoFields();
      this.registerForm.get('tipo')!.valueChanges.subscribe(() => this.applyTipoFields());
    }
  }
  private initializeForm() {
    this.registerForm = this.fb.group({
      tipo: [{ value: 'paciente', disabled: this.isEditMode }, Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      endereco: ['', Validators.required]
    });
  }

 private carregarDadosDoPaciente(id: number): void {
    this.pacienteService.buscarPacientePorId(id).subscribe(paciente => {
      this.applyTipoFields(); 
      this.registerForm.patchValue({
        nome: paciente.nome,
        email: paciente.email,
        endereco: paciente.endereco,
        idade: paciente.idade,
        sexo: paciente.sexo, 
        condicoes: paciente.condicoes ? paciente.condicoes.join(', ') : ''
      });
    });
  }

  private carregarDadosDoCentro(id: number): void {
    this.centroService.buscarCentroPorId(id).subscribe(centro => {
      this.applyTipoFields();
      this.registerForm.patchValue({
        nome: centro.nome,
        email: centro.email,
        endereco: centro.endereco,
        telefone: centro.telefone
      });
    });
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

   this.isSubmitting = true;
  if (this.registerForm.invalid) return;

  if (this.isEditMode) {
    if (this.tipoDeEdicao === 'paciente') {
      this.atualizarPaciente();
    } else if (this.tipoDeEdicao === 'centro') {
      this.atualizarCentro();
    }
  } else {
    this.registrarNovoUsuario();
  }
  }
  
private atualizarCentro(): void {
  if (!this.idParaEditar) return;
  const formValues = this.registerForm.getRawValue();
  const payload: Partial<CentroHome> = {
    nome: formValues.nome,
    email: formValues.email,
    endereco: formValues.endereco,
    telefone: formValues.telefone
  };
  if (formValues.senha) { (payload as any).senha = formValues.senha; }

  this.centroService.atualizarCentro(this.idParaEditar, payload).subscribe({
    next: () => {
      alert('Perfil do centro atualizado com sucesso!');
      this.router.navigate(['/centro-home', this.idParaEditar]);
      this.isSubmitting = false;
    },
    error: (err) => {
        alert(`Erro: ${err.error.message}`);
        this.isSubmitting = false;
      }
    });
}

private atualizarPaciente(): void {
    if (!this.idParaEditar) return;
    const formValues = this.registerForm.getRawValue();
    const payload: Partial<Paciente> = {
      nome: formValues.nome,
      email: formValues.email,
      endereco: formValues.endereco,
      idade: parseInt(formValues.idade, 10),
      sexo: formValues.sexo,
      condicoes: typeof formValues.condicoes === 'string' ? formValues.condicoes.split(',').map((c: string) => c.trim()).filter(Boolean) : formValues.condicoes
    };
    if (formValues.senha) { (payload as PacienteRegister).senha = formValues.senha; }
    this.pacienteService.atualizarPaciente(this.idParaEditar, payload).subscribe({
      next: () => {
        alert('Perfil de paciente atualizado com sucesso!');
        this.router.navigate(['/home-paciente', this.idParaEditar]);
        this.isSubmitting = false;
      },
      error: (err) => {
        alert(`Erro: ${err.error.message}`);
        this.isSubmitting = false; 
      }
    });
  }

private registrarNovoUsuario(): void {
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
        next: res => {
          console.log('Paciente cadastrado', res);
          this.router.navigate(['/login']);
          this.isSubmitting = false;
        },
       error: err => {
          console.error('Erro ao cadastrar paciente', err);
          this.isSubmitting = false; 
        }
      });

    } else if (tipo === 'centro') {
      const payload = {
        nome: formValues.nome,
        email: formValues.email,
        senha: formValues.senha,
        telefone: formValues.telefone,
        endereco: formValues.endereco,
      };
      this.authService.registerCentro(payload).subscribe({
        next: (res) => {
          console.log('Centro cadastrado com sucesso:', res);
          alert('Centro clínico cadastrado com sucesso! Você será redirecionado para o login.');
          this.router.navigate(['/login']);
          this.isSubmitting = false; 
        },
       error: (err) => {
          console.error('Erro ao cadastrar centro:', err);
          alert(`Erro no cadastro: ${err.error.error || 'Tente novamente.'}`);
          this.isSubmitting = false; 
        }
      });
    }
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

