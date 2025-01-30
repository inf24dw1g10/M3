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
import {Mesa, Pedido, Reserva} from '../models';
import {MesaRepository} from '../repositories';

export class MesaController {
  constructor(
    @repository(MesaRepository)
    public mesaRepository : MesaRepository,
  ) {}

  @post('/mesas')
  @response(200, {
    description: 'Mesa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mesa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mesa, {
            title: 'NewMesa',
            exclude: ['id'],
          }),
        },
      },
    })
    mesa: Omit<Mesa, 'id'>,
  ): Promise<Mesa> {
    return this.mesaRepository.create(mesa);
  }

  @get('/mesas')
  @response(200, {
    description: 'Array of Mesa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mesa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mesa) filter?: Filter<Mesa>,
  ): Promise<Mesa[]> {
    return this.mesaRepository.find(filter);
  }

  @get('/mesas/{id}')
  @response(200, {
    description: 'Mesa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mesa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Mesa, {exclude: 'where'}) filter?: FilterExcludingWhere<Mesa>
  ): Promise<Mesa> {
    return this.mesaRepository.findById(id, filter);
  }

  @patch('/mesas/{id}')
  @response(204, {
    description: 'Mesa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mesa, {partial: true}),
        },
      },
    })
    mesa: Mesa,
  ): Promise<void> {
    await this.mesaRepository.updateById(id, mesa);
  }

  @del('/mesas/{id}')
  @response(204, {
    description: 'Mesa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mesaRepository.deleteById(id);
  }

  // Endpoints adicionais para relações
  @get('/mesas/{id}/pedidos')
  @response(200, {
    description: 'Array of Pedidos for Mesa',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(Pedido)},
      },
    },
  })
  async getPedidos(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.mesaRepository.pedidos(id).find(filter);
  }

  @get('/mesas/{id}/reservas')
  @response(200, {
    description: 'Array of Reservas for Mesa',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(Reserva)},
      },
    },
  })
  async getReservas(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.mesaRepository.reservas(id).find(filter);
  }
}