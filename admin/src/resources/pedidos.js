import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    ReferenceField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput
  } from 'react-admin';
  
  export const PedidoList = () => (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <ReferenceField source="mesaId" reference="mesas">
          <NumberField source="numero" />
        </ReferenceField>
        <TextField source="status" />
        <NumberField 
          source="total" 
          options={{ style: 'currency', currency: 'BRL' }}
        />
      </Datagrid>
    </List>
  );
  
  export const PedidoEdit = () => (
    <Edit>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <ReferenceInput source="mesaId" reference="mesas">
          <SelectInput optionText="numero" />
        </ReferenceInput>
        <SelectInput source="status" choices={[
          { id: 'pendente', name: 'Pendente' },
          { id: 'preparando', name: 'Preparando' },
          { id: 'pronto', name: 'Pronto' },
          { id: 'entregue', name: 'Entregue' },
        ]} />
        <NumberInput source="total" />
      </SimpleForm>
    </Edit>
  );
  
  export const PedidoCreate = () => (
    <Create>
      <SimpleForm>
        <ReferenceInput source="mesaId" reference="mesas">
          <SelectInput optionText="numero" />
        </ReferenceInput>
        <SelectInput source="status" choices={[
          { id: 'pendente', name: 'Pendente' },
          { id: 'preparando', name: 'Preparando' },
          { id: 'pronto', name: 'Pronto' },
          { id: 'entregue', name: 'Entregue' },
        ]} />
        <NumberInput source="total" />
      </SimpleForm>
    </Create>
  );