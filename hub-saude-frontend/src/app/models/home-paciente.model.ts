import { EstudoClinico } from './estudo.model';

export interface Paciente {
  id: number;
  nome: string;
  idade: number;
  sexo: 'M' | 'F';
  email: string;
  condicoes: string[];
  endereco: string;
}

export interface Participacao {
  id: number;
  status: 'Ativo' | 'Inativo';
  dataParticipacao: string; 
}


export interface HomePacienteData {
   paciente: Paciente;
  estudos: EstudoClinico[];
  participacoes: unknown[];
}
