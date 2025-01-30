import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ItemPedido, Pedido, Menu} from '../models';
import {ItemPedidoRepository} from '../repositories';

export class ItemPedidoController {
  constructor(
    @repository(ItemPedidoRepository)
    public itemPedidoRepository : ItemPedidoRepository,
  ) {}

  @post('/items-pedido')
  @response(200, {
    description: 'ItemPedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(ItemPedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPedido, {
            title: 'NewItemPedido',
            exclude: ['id'],
          }),
        },
      },
    })
    itemPedido: Omit<ItemPedido, 'id'>,
  ): Promise<ItemPedido> {
    return this.itemPedidoRepository.create(itemPedido);
  }

  @get('/items-pedido')
  @response(200, {
    description: 'Array of ItemPedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemPedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ItemPedido) filter?: Filter<ItemPedido>,
  ): Promise<ItemPedido[]> {
    return this.itemPedidoRepository.find(filter);
  }

  @get('/items-pedido/{id}')
  @response(200, {
    description: 'ItemPedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemPedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ItemPedido, {exclude: 'where'}) filter?: FilterExcludingWhere<ItemPedido>
  ): Promise<ItemPedido> {
    return this.itemPedidoRepository.findById(id, filter);
  }

  @patch('/items-pedido/{id}')
  @response(204, {
    description: 'ItemPedido PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemPedido, {partial: true}),
        },
      },
    })
    itemPedido: ItemPedido,
  ): Promise<void> {
    await this.itemPedidoRepository.updateById(id, itemPedido);
  }

  @del('/items-pedido/{id}')
  @response(204, {
    description: 'ItemPedido DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemPedidoRepository.deleteById(id);
  }

  @get('/items-pedido/{id}/pedido')
  @response(200, {
    description: 'Pedido pertencente ao ItemPedido',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pedido),
      },
    },
  })
  async getPedido(
    @param.path.number('id') id: number,
  ): Promise<Pedido> {
    return await this.itemPedidoRepository.pedido(id);
  }

  @get('/items-pedido/{id}/menu')
  @response(200, {
    description: 'Menu item pertencente ao ItemPedido',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Menu),
      },
    },
  })
  async getMenu(
    @param.path.number('id') id: number,
  ): Promise<Menu> {
    return await this.itemPedidoRepository.itemMenu(id);
  }
}