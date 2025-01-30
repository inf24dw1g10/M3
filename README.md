# Relatório Técnico - M3: API REST Sistema de Restaurante
**Desenvolvido por:** Nuno Pereira (A045929) e José Cantinho (A045569)  
**Disciplina:** Desenvolvimento Web I  
**Semestre:** 1º Semestre 2024/25

## 1. Introdução

Este relatório documenta o desenvolvimento da API REST para um sistema de gestão de restaurante, implementada utilizando a estratégia Code-first com LoopBack 4 e React-Admin, seguindo os requisitos específicos do M3 que totalizam 8 valores.

## 2. Requisitos Implementados [8 valores]

### 2.1 API REST com Code-first [2 valores]
- Utilização do framework LoopBack 4 para desenvolvimento da API
- Implementação de controllers e models em TypeScript
- Definição de rotas e endpoints via decoradores
- Geração automática da documentação OpenAPI

Exemplo de Controller:
```typescript
export class MesaController {
  constructor(
    @repository(MesaRepository)
    public mesaRepository: MesaRepository,
  ) {}

  @get('/mesas', {
    responses: {
      '200': {
        description: 'Array of Mesa model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Mesa),
            },
          },
        },
      },
    },
  })
  async find(): Promise<Mesa[]> {
    return this.mesaRepository.find();
  }
}
```

### 2.2 Verbos HTTP CRUD [1.5 valores]
Implementação dos 4 verbos HTTP principais para cada recurso:
- **GET**: Listar e obter recursos específicos
- **POST**: Criar novos recursos
- **PUT**: Atualizar recursos existentes
- **DELETE**: Remover recursos

### 2.3 Recursos Distintos [1.5 valores]
Foram implementados 4 recursos principais:

1. **Mesas**
   - Número da mesa
   - Capacidade
   - Estado (livre/ocupada/reservada)

2. **Menu**
   - Nome do item
   - Descrição
   - Preço
   - Categoria
   - Disponibilidade

3. **Pedidos**
   - Mesa associada
   - Itens pedidos
   - Estado do pedido
   - Total

4. **Reservas**
   - Mesa reservada
   - Nome do cliente
   - Data e hora
   - Número de convidados

### 2.4 Relação de Cardinalidade [0.5 valores]
- Implementada relação m:n entre Pedidos e Itens do Menu
- Relação 1:n entre Mesas e Pedidos
- Relação 1:n entre Mesas e Reservas

### 2.5 Filtragem via Parâmetros [0.5 valores]
Implementados filtros HTTP para:
- Estado das mesas (?status=livre)
- Categoria do menu (?categoria=Pizzas)
- Data das reservas (?data=2024-02-15)

### 2.6 Interface React-Admin [1 valor]
- Dashboard administrativo completo
- Integração com API REST
- CRUD visual para todos os recursos
- Validações de formulário

### 2.7 Containerização Docker [0.5 valores]
Sistema distribuído em containers:
- MySQL para base de dados
- Node.js para backend
- Nginx para frontend
- Docker Compose para orquestração

### 2.8 Collection Postman [0.5 valores]
Documentação completa da API com exemplos de:
- Requisições para todos os endpoints
- Parâmetros de filtragem
- Corpo das requisições
- Respostas esperadas

## 3. Exemplos de Utilização

### 3.1 Criar Item no Menu
```http
POST /api/v1/menu
Content-Type: application/json

{
  "nome": "Pizza Margherita",
  "descricao": "Molho de tomate, mozzarella e manjericão",
  "preco": 15.90,
  "categoria": "Pizzas",
  "disponivel": true
}
```

### 3.2 Listar Mesas Disponíveis
```http
GET /api/v1/mesas?status=livre
```

### 3.3 Criar Reserva
```http
POST /api/v1/reservas
Content-Type: application/json

{
  "mesaId": 1,
  "clienteNome": "João Silva",
  "data": "2024-02-15T19:00:00",
  "numeroConvidados": 4
}
```

## 4. Conclusão

O projeto cumpriu todos os requisitos do M3, implementando:
- API REST completa usando Code-first
- 4 recursos principais com CRUD
- Interface administrativa funcional
- Documentação abrangente

A solução está pronta para ser expandida com funcionalidades adicionais como autenticação, relatórios e integrações com outros sistemas.