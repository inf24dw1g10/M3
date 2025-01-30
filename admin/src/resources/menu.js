import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    BooleanField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput
  } from 'react-admin';
  
  export const MenuList = () => (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="nome" />
        <TextField source="descricao" />
        <NumberField 
          source="preco" 
          options={{ style: 'currency', currency: 'BRL' }}
        />
        <TextField source="categoria" />
        <BooleanField source="disponivel" />
      </Datagrid>
    </List>
  );
  
  export const MenuEdit = () => (
    <Edit>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <TextInput source="nome" />
        <TextInput multiline source="descricao" />
        <NumberInput source="preco" />
        <TextInput source="categoria" />
        <BooleanInput source="disponivel" />
      </SimpleForm>
    </Edit>
  );
  
  export const MenuCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="nome" />
        <TextInput multiline source="descricao" />
        <NumberInput source="preco" />
        <TextInput source="categoria" />
        <BooleanInput source="disponivel" />
      </SimpleForm>
    </Create>
  );