import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { MesaList, MesaEdit, MesaCreate } from './resources/mesas';
import { MenuList, MenuEdit, MenuCreate } from './resources/menu';
import { PedidoList, PedidoEdit, PedidoCreate } from './resources/pedidos';
import { ReservaList, ReservaEdit, ReservaCreate } from './resources/reservas';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventIcon from '@mui/icons-material/Event';
import React from 'react';

const App = () => (
  <Admin dataProvider={simpleRestProvider('http://localhost:3000/api')}>
    <Resource 
      name="mesas" 
      list={MesaList}
      edit={MesaEdit}
      create={MesaCreate}
      icon={RestaurantIcon}
    />
    <Resource
      name="menu"
      list={MenuList}
      edit={MenuEdit}
      create={MenuCreate}
      icon={MenuBookIcon}
    />
    <Resource
      name="pedidos"
      list={PedidoList}
      edit={PedidoEdit}
      create={PedidoCreate}
      icon={ReceiptIcon}
    />
    <Resource
      name="reservas"
      list={ReservaList}
      edit={ReservaEdit}
      create={ReservaCreate}
      icon={EventIcon}
    />
  </Admin>
);

export default App;