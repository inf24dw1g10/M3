import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Reserva, ReservaRelations, Mesa} from '../models';
import {MesaRepository} from './mesa.repository';

export class ReservaRepository extends DefaultCrudRepository<Reserva, typeof Reserva.prototype.id, ReservaRelations> {
  public readonly mesa: BelongsToAccessor<Mesa, typeof Reserva.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MesaRepository')
    protected mesaRepositoryGetter: Getter<MesaRepository>
  ) {
    super(Reserva, dataSource);
    this.mesa = this.createBelongsToAccessorFor('mesa', mesaRepositoryGetter);
    this.registerInclusionResolver('mesa', this.mesa.inclusionResolver);
  }
}