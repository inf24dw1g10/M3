import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Mesa, MesaRelations, Pedido, Reserva} from '../models';
import {PedidoRepository} from './pedido.repository';
import {ReservaRepository} from './reserva.repository';

export class MesaRepository extends DefaultCrudRepository<Mesa, typeof Mesa.prototype.id, MesaRelations> {
  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Mesa.prototype.id>;
  public readonly reservas: HasManyRepositoryFactory<Reserva, typeof Mesa.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PedidoRepository')
    protected pedidoRepositoryGetter: Getter<PedidoRepository>,
    @repository.getter('ReservaRepository')
    protected reservaRepositoryGetter: Getter<ReservaRepository>
  ) {
    super(Mesa, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter);
    this.reservas = this.createHasManyRepositoryFactoryFor('reservas', reservaRepositoryGetter);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.registerInclusionResolver('reservas', this.reservas.inclusionResolver);
  }
}