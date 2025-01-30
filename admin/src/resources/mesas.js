import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    SelectInput
  } from 'react-admin';
  
  export const MesaList = () => (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <NumberField source="numero" />
        <NumberField source="capacidade" />
        <TextField source="status" />
      </Datagrid>
    </List>
  );
  
  export const MesaEdit = () => (
    <Edit>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <NumberInput source="numero" />
        <NumberInput source="capacidade" />
        <SelectInput source="status" choices={[
          { id: 'livre', name: 'Livre' },
          { id: 'ocupada', name: 'Ocupada' },
          { id: 'reservada', name: 'Reservada' },
        ]} />
      </SimpleForm>
    </Edit>
  );
  
  export const MesaCreate = () => (
    <Create>
      <SimpleForm>
        <NumberInput source="numero" />
        <NumberInput source="capacidade" />
        <SelectInput source="status" choices={[
          { id: 'livre', name: 'Livre' },
          { id: 'ocupada', name: 'Ocupada' },
          { id: 'reservada', name: 'Reservada' },
        ]} />
      </SimpleForm>
    </Create>
  );