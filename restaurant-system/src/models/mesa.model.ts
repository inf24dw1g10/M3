import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Reserva} from './reserva.model';

@model({
  settings: {
    mysql: {
      table: 'mesas'
    }
  }
})
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
    mysql: {
      columnName: 'numero'
    }
  })
  numero: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'capacidade'
    }
  })
  capacidade: number;

  @property({
    type: 'string',
    required: false,
    default: 'livre',
    mysql: {
      columnName: 'status'
    }
  })
  status?: 'livre' | 'ocupada' | 'reservada';

  @property({
    type: 'date',
    mysql: {
      columnName: 'created_at'
    }
  })
  createdAt?: string;

  @property({
    type: 'date',
    mysql: {
      columnName: 'updated_at'
    }
  })
  updatedAt?: string;

  @hasMany(() => Pedido, {keyTo: 'mesa_id'})
  pedidos: Pedido[];

  @hasMany(() => Reserva, {keyTo: 'mesa_id'})
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