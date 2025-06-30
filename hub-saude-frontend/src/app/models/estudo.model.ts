import { Participacao } from "./home-paciente.model";

export interface EstudoClinico {
  id?: number;
  titulo: string;
  descricao: string;
  descrica?: string; 
  fase: string;
  dataInicio?: Date | string;
  dataFim?: Date | string;
  criteriosInclusao?: string[];
  criteriosExclusao?: string[];
  dataEntrada?: string;
  totalPacientes?: number;

  centroClinico?: any; 
  participacoes?: Participacao[];
}