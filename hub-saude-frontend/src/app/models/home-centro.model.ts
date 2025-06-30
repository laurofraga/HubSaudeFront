import { EstudoClinico } from "./estudo.model";

export interface CentroHome {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  telefone: string;
}


export interface HomeCentroData {
  centro: CentroHome;
  estudos: EstudoClinico[];
}
