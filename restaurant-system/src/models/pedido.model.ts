import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Mesa} from './mesa.model';
import {ItemPedido} from './item-pedido.model';

@model({
  settings: {
    mysql: {
      table: 'pedidos'
    }
  }
})
export class Pedido extends Entity {
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
    mysql: {
      columnName: 'status'
    }
  })
  status?: 'pendente' | 'preparando' | 'pronto' | 'entregue';

  @property({
    type: 'number',
    mysql: {
      columnName: 'total'
    },
    default: 0
  })
  total: number;

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

  @hasMany(() => ItemPedido, {keyTo: 'pedido_id'})
  itens: ItemPedido[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  mesa?: Mesa;
  itens?: ItemPedido[];
}

export type PedidoWithRelations = Pedido & PedidoRelations;