import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Menu} from './menu.model';
import {Pedido} from './pedido.model';

@model({
  settings: {
    mysql: {
      table: 'itens_pedido'
    }
  }
})
export class ItemPedido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Pedido, {keyTo: 'id', name: 'pedido'})
  pedido_id: number;

  @belongsTo(() => Menu, {keyTo: 'id', name: 'menu'})
  item_menu_id: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'quantidade'
    }
  })
  quantidade: number;

  @property({
    type: 'string',
    mysql: {
      columnName: 'observacoes'
    }
  })
  observacoes?: string;

  @property({
    type: 'date',
    mysql: {
      columnName: 'created_at'
    }
  })
  createdAt?: string;

  constructor(data?: Partial<ItemPedido>) {
    super(data);
  }
}

export interface ItemPedidoRelations {
  pedido?: Pedido;
  menu?: Menu;
}

export type ItemPedidoWithRelations = ItemPedido & ItemPedidoRelations;