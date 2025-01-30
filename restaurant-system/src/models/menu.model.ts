import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'menu'
    }
  }
})
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
    mysql: {
      columnName: 'nome'
    }
  })
  nome: string;

  @property({
    type: 'string',
    mysql: {
      columnName: 'descricao'
    }
  })
  descricao?: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      columnName: 'preco'
    }
  })
  preco: number;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'categoria'
    }
  })
  categoria: string;

  @property({
    type: 'boolean',
    default: true,
    mysql: {
      columnName: 'disponivel'
    }
  })
  disponivel?: boolean;

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

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
}

export type MenuWithRelations = Menu & MenuRelations;