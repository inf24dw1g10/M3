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
import {Pedido, ItemPedido} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository : PedidoRepository,
  ) {}

  @post('/pedidos')
  @response(200, {
    description: 'Pedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedido',
            exclude: ['id'],
          }),
        },
      },
    })
    pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    return this.pedidoRepository.create(pedido);
  }

  @get('/pedidos')
  @response(200, {
    description: 'Array of Pedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pedido) filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.pedidoRepository.find(filter);
  }

  @get('/pedidos/{id}')
  @response(200, {
    description: 'Pedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pedido, {exclude: 'where'}) filter?: FilterExcludingWhere<Pedido>
  ): Promise<Pedido> {
    return this.pedidoRepository.findById(id, filter);
  }

  @patch('/pedidos/{id}')
  @response(204, {
    description: 'Pedido PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Pedido,
  ): Promise<void> {
    await this.pedidoRepository.updateById(id, pedido);
  }

  @del('/pedidos/{id}')
  @response(204, {
    description: 'Pedido DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidoRepository.deleteById(id);
  }

  // Endpoints adicionais para relações
  @get('/pedidos/{id}/itens')
  @response(200, {
    description: 'Array of ItemPedido for Pedido',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(ItemPedido)},
      },
    },
  })
  async getItens(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ItemPedido>,
  ): Promise<ItemPedido[]> {
    return this.pedidoRepository.itens(id).find(filter);
  }
}