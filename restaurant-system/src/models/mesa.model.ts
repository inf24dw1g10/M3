import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Reserva} from './reserva.model';

@model()
export class Mesa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @property({
    type: 'number',
    required: true,
  })
  capacidade: number;

  @property({
    type: 'string',
    default: 'livre',
  })
  status?: 'livre' | 'ocupada' | 'reservada';

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  @hasMany(() => Reserva)
  reservas: Reserva[];

  constructor(data?: Partial<Mesa>) {
    super(data);
  }
}

export interface MesaRelations {
  pedidos?: Pedido[];
  reservas?: Reserva[];
}

export type MesaWithRelations = Mesa & MesaRelations;