import React from 'react';
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

// Configuração do API URL com fallback
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

// Configuração do dataProvider com headers personalizados
const dataProvider = simpleRestProvider(apiUrl, fetch, {
  headers: new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }),
});

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    title="Gestão do Restaurante"
  >
    <Resource 
      name="mesas" 
      list={MesaList}
      edit={MesaEdit}
      create={MesaCreate}
      icon={RestaurantIcon}
      options={{ label: 'Mesas' }}
    />
    <Resource
      name="menu"
      list={MenuList}
      edit={MenuEdit}
      create={MenuCreate}
      icon={MenuBookIcon}
      options={{ label: 'Menu' }}
    />
    <Resource
      name="pedidos"
      list={PedidoList}
      edit={PedidoEdit}
      create={PedidoCreate}
      icon={ReceiptIcon}
      options={{ label: 'Pedidos' }}
    />
    <Resource
      name="reservas"
      list={ReservaList}
      edit={ReservaEdit}
      create={ReservaCreate}
      icon={EventIcon}
      options={{ label: 'Reservas' }}
    />
  </Admin>
);

export default App;