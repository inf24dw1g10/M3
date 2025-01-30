import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ItemPedido, ItemPedidoRelations, Pedido, Menu} from '../models';
import {PedidoRepository} from './pedido.repository';
import {MenuRepository} from './menu.repository';

export class ItemPedidoRepository extends DefaultCrudRepository<ItemPedido, typeof ItemPedido.prototype.id, ItemPedidoRelations> {
  public readonly pedido: BelongsToAccessor<Pedido, typeof ItemPedido.prototype.id>;
  public readonly itemMenu: BelongsToAccessor<Menu, typeof ItemPedido.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PedidoRepository')
    protected pedidoRepositoryGetter: Getter<PedidoRepository>,
    @repository.getter('MenuRepository')
    protected menuRepositoryGetter: Getter<MenuRepository>
  ) {
    super(ItemPedido, dataSource);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter);
    this.itemMenu = this.createBelongsToAccessorFor('itemMenu', menuRepositoryGetter);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
    this.registerInclusionResolver('itemMenu', this.itemMenu.inclusionResolver);
  }
}