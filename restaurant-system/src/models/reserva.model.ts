import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mesa} from './mesa.model';

@model()
export class Reserva extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Mesa)
  mesaId: number;

  @property({
    type: 'string',
    required: true,
  })
  clienteNome: string;

  @property({
    type: 'date',
    required: true,
  })
  data: string;

  @property({
    type: 'number',
    required: true,
  })
  numeroConvidados: number;

  @property({
    type: 'string',
    default: 'confirmada',
  })
  status?: 'confirmada' | 'cancelada' | 'concluída';

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  mesa?: Mesa;
}

export type ReservaWithRelations = Reserva & ReservaRelations;