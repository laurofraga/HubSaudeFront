import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomePacienteComponent } from './pages/home-paciente.component';
import { HomeCentroComponent } from './pages/home-centro/home-centro.component';
import { CriarEstudoComponent } from './pages/home-centro/criar-estudo/criar-estudo.component';
import { DetalhesEstudoComponent } from './pages/estudos/detalhes-estudo/detalhes-estudo.component';
import { DetalheEstudoPacienteComponent } from './pages/paciente/detalhe-estudo-paciente/detalhe-estudo-paciente.component';
import { PesquisarEstudosComponent } from './pages/paciente/pesquisar-estudos/pesquisar-estudos.component';
import path from 'path';
import { DetalheEstudoPublicoComponent } from './pages/paciente/detalhe-estudo-publico/detalhe-estudo-publico.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home-paciente/:id', component: HomePacienteComponent },
  { path: 'centro-home/:id', component: HomeCentroComponent },
  {path: 'centro/:id/criar-estudo', component: CriarEstudoComponent},
  {path: 'estudos/:id', component: DetalhesEstudoComponent},
  { path: 'meus-estudos/:id', component: DetalheEstudoPacienteComponent },
  { path: 'pesquisar-estudos', component: PesquisarEstudosComponent },
  { path: 'estudos-publicos/:id', component: DetalheEstudoPublicoComponent},
  { path: 'estudos/editar/:id', component: CriarEstudoComponent },
  { path: 'paciente/editar/:id', component: RegisterComponent },
  { path: 'centro/editar/:id', component: RegisterComponent },
];


export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule)
  ]
};