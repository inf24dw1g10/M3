import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mesa} from './mesa.model';

@model({
  settings: {
    mysql: {
      table: 'reservas'
    }
  }
})
export class Reserva extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Mesa, {keyTo: 'id', name: 'mesa'})
  mesa_id: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'cliente_nome'
    }
  })
  clienteNome: string;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'data'
    }
  })
  data: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'numero_convidados'
    }
  })
  numeroConvidados: number;

  @property({
    type: 'string',
    mysql: {
      columnName: 'status'
    }
  })
  status?: 'confirmada' | 'cancelada' | 'concluída';

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

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  mesa?: Mesa;
}

export type ReservaWithRelations = Reserva & ReservaRelations;