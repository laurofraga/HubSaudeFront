export interface Participacao {
  id: number;
  dataParticipacao: string;
}

export interface EstudoClinico {
  id: number;
  titulo: string;
  descricao: string;
  fase: string;
  dataInicio: string;
}

export interface HomePacienteData {
    paciente: {
        id: number;
        nome: string;
        email: string;};

    estudos: EstudoClinico[];
}
