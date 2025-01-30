import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Mesa} from './mesa.model';
import {ItemPedido} from './item-pedido.model';

@model()
export class Pedido extends Entity {
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
    default: 'pendente',
  })
  status?: 'pendente' | 'preparando' | 'pronto' | 'entregue';

  @property({
    type: 'number',
    default: 0,
  })
  total?: number;

  @hasMany(() => ItemPedido)
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