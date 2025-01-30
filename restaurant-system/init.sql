SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Criação das tabelas
CREATE TABLE mesas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL UNIQUE,
    capacidade INT NOT NULL,
    status ENUM('livre', 'ocupada', 'reservada') DEFAULT 'livre',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mesa_id INT NOT NULL,
    cliente_nome VARCHAR(100) NOT NULL,
    data DATETIME NOT NULL,
    numero_convidados INT NOT NULL,
    status ENUM('confirmada', 'cancelada', 'concluída') DEFAULT 'confirmada',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mesa_id) REFERENCES mesas(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mesa_id INT NOT NULL,
    status ENUM('pendente', 'preparando', 'pronto', 'entregue') DEFAULT 'pendente',
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mesa_id) REFERENCES mesas(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE itens_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL,
    item_menu_id INT NOT NULL,
    quantidade INT NOT NULL,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (item_menu_id) REFERENCES menu(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Habilitar verificação de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 1;

-- Correção para a tabela itens_pedido (adicionar ON DELETE CASCADE)
ALTER TABLE itens_pedido 
DROP FOREIGN KEY itens_pedido_ibfk_1,
DROP FOREIGN KEY itens_pedido_ibfk_2;

ALTER TABLE itens_pedido
ADD CONSTRAINT itens_pedido_pedido_fk
FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
ADD CONSTRAINT itens_pedido_menu_fk
FOREIGN KEY (item_menu_id) REFERENCES menu(id) ON DELETE RESTRICT;

-- Correção para a tabela pedidos
ALTER TABLE pedidos 
DROP FOREIGN KEY pedidos_ibfk_1;

ALTER TABLE pedidos
ADD CONSTRAINT pedidos_mesa_fk
FOREIGN KEY (mesa_id) REFERENCES mesas(id) ON DELETE RESTRICT;

-- Correção para a tabela reservas
ALTER TABLE reservas 
DROP FOREIGN KEY reservas_ibfk_1;

ALTER TABLE reservas
ADD CONSTRAINT reservas_mesa_fk
FOREIGN KEY (mesa_id) REFERENCES mesas(id) ON DELETE RESTRICT;

-- Adicionar índices para melhor performance
ALTER TABLE pedidos ADD INDEX idx_status (status);
ALTER TABLE pedidos ADD INDEX idx_created_at (created_at);
ALTER TABLE reservas ADD INDEX idx_data (data);
ALTER TABLE menu ADD INDEX idx_categoria (categoria);
ALTER TABLE menu ADD INDEX idx_disponivel (disponivel);

-- Inserir 30 mesas
INSERT INTO mesas (numero, capacidade, status) VALUES 
(1, 2, 'livre'), (2, 2, 'livre'), (3, 2, 'livre'), (4, 2, 'livre'), (5, 2, 'livre'),
(6, 4, 'livre'), (7, 4, 'livre'), (8, 4, 'livre'), (9, 4, 'livre'), (10, 4, 'livre'),
(11, 6, 'livre'), (12, 6, 'livre'), (13, 6, 'livre'), (14, 6, 'livre'), (15, 6, 'livre'),
(16, 8, 'livre'), (17, 8, 'livre'), (18, 8, 'livre'), (19, 8, 'livre'), (20, 8, 'livre'),
(21, 2, 'livre'), (22, 4, 'livre'), (23, 6, 'livre'), (24, 8, 'livre'), (25, 2, 'livre'),
(26, 4, 'livre'), (27, 6, 'livre'), (28, 8, 'livre'), (29, 4, 'livre'), (30, 6, 'livre');

-- Inserir 30 itens no menu
INSERT INTO menu (nome, descricao, preco, categoria) VALUES
-- Entradas
('Bruschetta', 'Pão italiano com tomate, alho e manjericão', 25.90, 'Entradas'),
('Carpaccio', 'Finas fatias de carne com molho de mostarda e alcaparras', 45.90, 'Entradas'),
('Camarão empanado', 'Camarões empanados com molho tártaro', 55.90, 'Entradas'),
('Salada Caesar', 'Alface romana, croutons, parmesão e molho caesar', 35.90, 'Entradas'),
('Sopa de cebola', 'Sopa de cebola gratinada com queijo', 28.90, 'Entradas'),

-- Massas
('Spaghetti Carbonara', 'Massa com molho cremoso, bacon e parmesão', 48.90, 'Massas'),
('Fettuccine Alfredo', 'Massa com molho branco e frango', 46.90, 'Massas'),
('Ravioli de Queijo', 'Massa recheada com queijo ao molho pomodoro', 52.90, 'Massas'),
('Lasanha à Bolonhesa', 'Camadas de massa com molho de carne e queijo', 54.90, 'Massas'),
('Nhoque ao Pesto', 'Nhoque de batata com molho pesto', 47.90, 'Massas'),

-- Carnes
('Filé Mignon', 'Filé mignon grelhado com molho madeira', 89.90, 'Carnes'),
('Picanha', 'Picanha grelhada com arroz e farofa', 85.90, 'Carnes'),
('Costela no Bafo', 'Costela assada lentamente com batatas', 78.90, 'Carnes'),
('Frango Grelhado', 'Peito de frango grelhado com legumes', 45.90, 'Carnes'),
('Prime Rib', 'Prime rib assado com batatas rústicas', 95.90, 'Carnes'),

-- Peixes
('Salmão Grelhado', 'Salmão grelhado com legumes', 82.90, 'Peixes'),
('Pescada ao Molho', 'Filé de pescada ao molho de camarão', 68.90, 'Peixes'),
('Polvo à Portuguesa', 'Polvo cozido com batatas e azeite', 98.90, 'Peixes'),
('Bacalhau à Lagareiro', 'Bacalhau assado com batatas e brócolis', 105.90, 'Peixes'),
('Camarão na Moranga', 'Camarões ao molho de abóbora', 88.90, 'Peixes'),

-- Sobremesas
('Pudim', 'Pudim de leite condensado', 18.90, 'Sobremesas'),
('Pavê de Chocolate', 'Pavê de chocolate com creme', 22.90, 'Sobremesas'),
('Tiramisù', 'Sobremesa italiana com café e mascarpone', 25.90, 'Sobremesas'),
('Petit Gateau', 'Bolinho de chocolate com sorvete', 28.90, 'Sobremesas'),
('Cheesecake', 'Cheesecake de frutas vermelhas', 24.90, 'Sobremesas'),

-- Bebidas
('Água Mineral', 'Água mineral sem gás 500ml', 5.90, 'Bebidas'),
('Refrigerante', 'Refrigerante lata 350ml', 6.90, 'Bebidas'),
('Suco Natural', 'Suco de frutas natural 500ml', 12.90, 'Bebidas'),
('Vinho da Casa', 'Taça de vinho tinto da casa 150ml', 22.90, 'Bebidas'),
('Cerveja', 'Cerveja long neck 355ml', 9.90, 'Bebidas');

-- Inserir 30 reservas (distribuídas nos próximos 30 dias)
INSERT INTO reservas (mesa_id, cliente_nome, data, numero_convidados, status) VALUES
(1, 'João Silva', '2025-01-30 19:00:00', 2, 'confirmada'),
(2, 'Maria Santos', '2025-01-30 20:00:00', 2, 'confirmada'),
(3, 'Pedro Oliveira', '2025-01-31 19:00:00', 2, 'confirmada'),
(4, 'Ana Souza', '2025-01-31 20:00:00', 2, 'confirmada'),
(5, 'Carlos Ferreira', '2025-02-01 19:00:00', 2, 'confirmada'),
(6, 'Juliana Lima', '2025-02-01 20:00:00', 4, 'confirmada'),
(7, 'Ricardo Costa', '2025-02-02 19:00:00', 4, 'confirmada'),
(8, 'Patricia Martins', '2025-02-02 20:00:00', 4, 'confirmada'),
(9, 'Fernando Santos', '2025-02-03 19:00:00', 4, 'confirmada'),
(10, 'Camila Rodrigues', '2025-02-03 20:00:00', 4, 'confirmada'),
(11, 'Bruno Alves', '2025-02-04 19:00:00', 6, 'confirmada'),
(12, 'Larissa Pereira', '2025-02-04 20:00:00', 6, 'confirmada'),
(13, 'Marcelo Silva', '2025-02-05 19:00:00', 6, 'confirmada'),
(14, 'Amanda Costa', '2025-02-05 20:00:00', 6, 'confirmada'),
(15, 'Roberto Santos', '2025-02-06 19:00:00', 6, 'confirmada'),
(16, 'Carolina Lima', '2025-02-06 20:00:00', 8, 'confirmada'),
(17, 'Gabriel Oliveira', '2025-02-07 19:00:00', 8, 'confirmada'),
(18, 'Daniela Martins', '2025-02-07 20:00:00', 8, 'confirmada'),
(19, 'Lucas Ferreira', '2025-02-08 19:00:00', 8, 'confirmada'),
(20, 'Isabela Santos', '2025-02-08 20:00:00', 8, 'confirmada'),
(21, 'Paulo Souza', '2025-02-09 19:00:00', 2, 'confirmada'),
(22, 'Beatriz Lima', '2025-02-09 20:00:00', 4, 'confirmada'),
(23, 'Rafael Costa', '2025-02-10 19:00:00', 6, 'confirmada'),
(24, 'Mariana Silva', '2025-02-10 20:00:00', 8, 'confirmada'),
(25, 'Thiago Alves', '2025-02-11 19:00:00', 2, 'confirmada'),
(26, 'Fernanda Santos', '2025-02-11 20:00:00', 4, 'confirmada'),
(27, 'Eduardo Lima', '2025-02-12 19:00:00', 6, 'confirmada'),
(28, 'Luana Pereira', '2025-02-12 20:00:00', 8, 'confirmada'),
(29, 'Gustavo Martins', '2025-02-13 19:00:00', 4, 'confirmada'),
(30, 'Vanessa Costa', '2025-02-13 20:00:00', 6, 'confirmada');

-- Inserir 30 pedidos
INSERT INTO pedidos (mesa_id, status, total) VALUES
(1, 'entregue', 156.70),
(2, 'entregue', 198.90),
(3, 'entregue', 245.80),
(4, 'entregue', 167.90),
(5, 'entregue', 189.90),
(6, 'pronto', 278.90),
(7, 'pronto', 345.60),
(8, 'pronto', 289.90),
(9, 'pronto', 312.80),
(10, 'pronto', 267.90),
(11, 'preparando', 456.70),
(12, 'preparando', 389.90),
(13, 'preparando', 423.80),
(14, 'preparando', 378.90),
(15, 'preparando', 412.70),
(16, 'pendente', 567.80),
(17, 'pendente', 489.90),
(18, 'pendente', 534.80),
(19, 'pendente', 478.90),
(20, 'pendente', 523.70),
(21, 'entregue', 145.80),
(22, 'entregue', 234.90),
(23, 'pronto', 345.80),
(24, 'preparando', 456.70),
(25, 'pendente', 167.90),
(26, 'entregue', 278.90),
(27, 'pronto', 389.80),
(28, 'preparando', 489.70),
(29, 'pendente', 234.90),
(30, 'entregue', 345.80);

-- Inserir itens dos pedidos (3 itens para cada pedido)
INSERT INTO itens_pedido (pedido_id, item_menu_id, quantidade, observacoes) VALUES
-- Para cada pedido, vamos adicionar 3 itens diferentes
(1, 1, 1, 'Sem alho'), (1, 6, 2, NULL), (1, 21, 1, NULL),
(2, 2, 1, NULL), (2, 7, 2, 'Molho extra'), (2, 22, 1, NULL),
(3, 3, 2, NULL), (3, 8, 1, NULL), (3, 23, 1, 'Sem café'),
(4, 4, 1, 'Sem croutons'), (4, 9, 1, NULL), (4, 24, 2, NULL),
(5, 5, 1, NULL), (5, 10, 2, 'Sem manjericão'), (5, 25, 1, NULL),
(6, 1, 2, NULL), (6, 11, 1, 'Ao ponto'), (6, 21, 2, NULL),
(7, 2, 2, NULL), (7, 12, 1, 'Mal passada'), (7, 22, 2, NULL),
(8, 3, 1, 'Molho extra'), (8, 13, 2, NULL), (8, 23, 1, NULL),
(9, 4, 2, NULL), (9, 14, 1, 'Sem legumes'), (9, 24, 1, NULL),
(10, 5, 1, NULL), (10, 15, 2, 'Ao ponto'), (10, 25, 2, NULL),
(11, 1, 2, 'Sem tomate'), (11, 6, 1, NULL), (11, 26, 3, NULL),
(12, 2, 1, NULL), (12, 7, 2, 'Molho separado'), (12, 27, 2, NULL),
(13, 3, 2, 'Molho extra'), (13, 8, 1, NULL), (13, 28, 2, NULL),
(14, 4, 1, NULL), (14, 9, 2, 'Sem queijo'), (14, 29, 1, NULL),
(15, 5, 2, NULL), (15, 10, 1, NULL), (15, 30, 2, NULL),
(16, 1, 1, NULL), (16, 11, 2, 'Bem passada'), (16, 21, 1, NULL),
(17, 2, 2, 'Sem alcaparras'), (17, 12, 1, NULL), (17, 22, 2, NULL),
(18, 3, 1, NULL), (18, 13, 2, 'Com farofa extra'), (18, 23, 1, NULL),
(19, 4, 2, 'Sem croutons'), (19, 14, 1, NULL), (19, 24, 2, NULL),
(20, 5, 1, NULL), (20, 15, 2, 'Mal passada'), (20, 25, 1, NULL),
(21, 6, 2, NULL), (21, 16, 1, 'Sem legumes'), (21, 26, 2, NULL),
(22, 7, 1, 'Molho extra'), (22, 17, 2, NULL), (22, 27, 1, NULL),
(23, 8, 2, NULL), (23, 18, 1, 'Bem cozido'), (23, 28, 2, NULL),
(24, 9, 1, NULL), (24, 19, 2, 'Sem batatas'), (24, 29, 1, NULL),
(25, 10, 2, 'Sem manjericão'), (25, 20, 1, NULL), (25, 30, 2, NULL),
(26, 11, 1, 'Ao ponto'), (26, 6, 2, NULL), (26, 21, 1, NULL),
(27, 12, 2, NULL), (27, 7, 1, 'Molho separado'), (27, 22, 2, NULL),
(27, 13, 1, 'Bem passada'), (27, 8, 2, NULL), (27, 23, 1, NULL),
(28, 14, 2, NULL), (28, 9, 1, 'Sem queijo'), (28, 24, 2, NULL),
(29, 15, 1, 'Mal passada'), (29, 10, 2, NULL), (29, 25, 1, NULL),
(30, 16, 2, NULL), (30, 11, 1, 'Ao ponto'), (30, 26, 2, NULL);