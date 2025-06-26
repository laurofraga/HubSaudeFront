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

export interface EstudoClinico {
  id: number;
  titulo: string;
  descricao: string;         
  fase: string;               
  dataEntrada: string;        
  participacoes?: Participacao[]
  status?: 'Recrutando' | 'Encerrado' | 'Em Breve'; 
}

export interface HomePacienteData {
   paciente: Paciente;
  estudos: EstudoClinico[];
  participacoes: unknown[];
}
