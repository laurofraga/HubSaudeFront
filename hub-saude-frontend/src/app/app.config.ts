import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomePacienteComponent } from './pages/home-paciente.component';
import { HomeCentroComponent } from './pages/home-centro/home-centro.component';
import { CriarEstudoComponent } from './pages/home-centro/criar-estudo/criar-estudo.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home-paciente/:id', component: HomePacienteComponent },
  { path: 'centro-home/:id', component: HomeCentroComponent },
  {path: 'centro/:id/criar-estudo', component: CriarEstudoComponent}
];


export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule)
  ]
};