import {Entity, model, property} from '@loopback/repository';

@model()
export class Menu extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
  })
  descricao?: string;

  @property({
    type: 'number',
    required: true,
  })
  preco: number;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @property({
    type: 'boolean',
    default: true,
  })
  disponivel?: boolean;

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // define navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;