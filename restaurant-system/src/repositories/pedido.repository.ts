import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Mesa, ItemPedido} from '../models';
import {MesaRepository} from './mesa.repository';
import {ItemPedidoRepository} from './item-pedido.repository';

export class PedidoRepository extends DefaultCrudRepository<Pedido, typeof Pedido.prototype.id, PedidoRelations> {
  public readonly mesa: BelongsToAccessor<Mesa, typeof Pedido.prototype.id>;
  public readonly itens: HasManyRepositoryFactory<ItemPedido, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MesaRepository')
    protected mesaRepositoryGetter: Getter<MesaRepository>,
    @repository.getter('ItemPedidoRepository')
    protected itemPedidoRepositoryGetter: Getter<ItemPedidoRepository>
  ) {
    super(Pedido, dataSource);
    this.mesa = this.createBelongsToAccessorFor('mesa', mesaRepositoryGetter);
    this.itens = this.createHasManyRepositoryFactoryFor('itens', itemPedidoRepositoryGetter);
    this.registerInclusionResolver('mesa', this.mesa.inclusionResolver);
    this.registerInclusionResolver('itens', this.itens.inclusionResolver);
  }
}