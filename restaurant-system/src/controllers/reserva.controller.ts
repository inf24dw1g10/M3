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
import {Reserva, Mesa} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository : ReservaRepository,
  ) {}

  @post('/reservas')
  @response(200, {
    description: 'Reserva model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReserva',
            exclude: ['id'],
          }),
        },
      },
    })
    reserva: Omit<Reserva, 'id'>,
  ): Promise<Reserva> {
    return this.reservaRepository.create(reserva);
  }

  @get('/reservas')
  @response(200, {
    description: 'Array of Reserva model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reserva, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reserva) filter?: Filter<Reserva>,
  ): Promise<Reserva[]> {
    return this.reservaRepository.find(filter);
  }

  @get('/reservas/{id}')
  @response(200, {
    description: 'Reserva model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reserva, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Reserva, {exclude: 'where'}) filter?: FilterExcludingWhere<Reserva>
  ): Promise<Reserva> {
    return this.reservaRepository.findById(id, filter);
  }

  @patch('/reservas/{id}')
  @response(204, {
    description: 'Reserva PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Reserva,
  ): Promise<void> {
    await this.reservaRepository.updateById(id, reserva);
  }

  @del('/reservas/{id}')
  @response(204, {
    description: 'Reserva DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reservaRepository.deleteById(id);
  }

  // Endpoints adicionais para relações
  @get('/reservas/{id}/mesa')
  @response(200, {
    description: 'Mesa belonging to Reserva',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mesa),
      },
    },
  })
  async getMesa(
    @param.path.number('id') id: number,
  ): Promise<Mesa> {
    return this.reservaRepository.mesa(id);
  }
}