import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Menu} from './menu.model';
import {Pedido} from './pedido.model';

@model()
export class ItemPedido extends Entity {
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
  pedidoId: number;

  @belongsTo(() => Menu)
  itemMenuId: number;

  @property({
    type: 'number',
    required: true,
  })
  quantidade: number;

  @property({
    type: 'string',
  })
  observacoes?: string;

  constructor(data?: Partial<ItemPedido>) {
    super(data);
  }
}

export interface ItemPedidoRelations {
  pedido?: Pedido;
  menu?: Menu;
}

export type ItemPedidoWithRelations = ItemPedido & ItemPedidoRelations;