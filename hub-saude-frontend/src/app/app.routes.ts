import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { loginGuard } from './auth/login.guard';
import { userDataResolver } from './auth/user-data.resolver';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomePacienteComponent } from './pages/home-paciente.component';
import { HomeCentroComponent } from './pages/home-centro/home-centro.component';
import { CriarEstudoComponent } from './pages/home-centro/criar-estudo/criar-estudo.component';
import { DetalhesEstudoComponent } from './pages/estudos/detalhes-estudo/detalhes-estudo.component';
import { DetalheEstudoPacienteComponent } from './pages/paciente/detalhe-estudo-paciente/detalhe-estudo-paciente.component';
import { PesquisarEstudosComponent } from './pages/paciente/pesquisar-estudos/pesquisar-estudos.component';
import { DetalheEstudoPublicoComponent } from './pages/paciente/detalhe-estudo-publico/detalhe-estudo-publico.component';
import { ListaParticipantesComponent } from './pages/estudos/lista-participantes/lista-participantes.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: [loginGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'home-paciente/:id', component: HomePacienteComponent, canActivate: [authGuard],resolve: {
      usuario: userDataResolver
    } },
  { path: 'centro-home/:id', component: HomeCentroComponent, canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    } },
  {path: 'centro/:id/criar-estudo', component: CriarEstudoComponent, canActivate: [authGuard],resolve: {
      usuario: userDataResolver
    } },
  {path: 'estudos/:id', component: DetalhesEstudoComponent, canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    } },
  { path: 'meus-estudos/:id', component: DetalheEstudoPacienteComponent, canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    }  },
  { path: 'pesquisar-estudos', component: PesquisarEstudosComponent,canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    }  },
  { path: 'estudos-publicos/:id', component: DetalheEstudoPublicoComponent, canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    } },
  { path: 'estudos/editar/:id', component: CriarEstudoComponent ,canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    } },
  { path: 'paciente/editar/:id', component: RegisterComponent,canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    }  },
  { path: 'centro/editar/:id', component: RegisterComponent, canActivate: [authGuard] ,resolve: {
      usuario: userDataResolver
    } },
   { path: 'estudos/:id/participantes', component: ListaParticipantesComponent, canActivate: [authGuard], resolve: {
      usuario: userDataResolver
    }  },
];