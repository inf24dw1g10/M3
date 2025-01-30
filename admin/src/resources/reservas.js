import React from 'react';

import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    ReferenceField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    DateTimeInput,
    ReferenceInput,
    SelectInput
  } from 'react-admin';
  
  export const ReservaList = () => (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <ReferenceField source="mesaId" reference="mesas">
          <NumberField source="numero" />
        </ReferenceField>
        <TextField source="clienteNome" />
        <DateField source="data" showTime />
        <NumberField source="numeroConvidados" />
        <TextField source="status" />
      </Datagrid>
    </List>
  );
  
  export const ReservaEdit = () => (
    <Edit>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <ReferenceInput source="mesaId" reference="mesas">
          <SelectInput optionText="numero" />
        </ReferenceInput>
        <TextInput source="clienteNome" />
        <DateTimeInput source="data" />
        <NumberInput source="numeroConvidados" />
        <SelectInput source="status" choices={[
          { id: 'confirmada', name: 'Confirmada' },
          { id: 'cancelada', name: 'Cancelada' },
          { id: 'concluída', name: 'Concluída' },
        ]} />
      </SimpleForm>
    </Edit>
  );
  
  export const ReservaCreate = () => (
    <Create>
      <SimpleForm>
        <ReferenceInput source="mesaId" reference="mesas">
          <SelectInput optionText="numero" />
        </ReferenceInput>
        <TextInput source="clienteNome" />
        <DateTimeInput source="data" />
        <NumberInput source="numeroConvidados" />
        <SelectInput source="status" choices={[
          { id: 'confirmada', name: 'Confirmada' },
          { id: 'cancelada', name: 'Cancelada' },
          { id: 'concluída', name: 'Concluída' },
        ]} />
      </SimpleForm>
    </Create>
  );