export interface CentroHome {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  telefone: string;
}

export interface EstudoCentro {
  id: number;
  titulo: string;
  descricao: string;        
  fase: string;             
  dataInicio: string;       
  dataFim: string;          
  totalPacientes: number;
}

export interface HomeCentroData {
  centro: CentroHome;
  estudos: EstudoCentro[];
}
