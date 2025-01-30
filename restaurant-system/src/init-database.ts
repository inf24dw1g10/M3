import * as mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function initDatabase() {
  console.log('Iniciando configuração do banco de dados...');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
  };

  try {
    console.log('Tentando conectar ao MySQL...');
    const connection = await mysql.createConnection(config);
    
    console.log('Conexão estabelecida! Criando banco de dados...');
    await connection.query('CREATE DATABASE IF NOT EXISTS init');
    
    console.log('Usando banco de dados init...');
    await connection.query('USE init');
    
    console.log('Lendo arquivo SQL...');
    const sqlPath = path.join(__dirname, '../init.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Executando script SQL...');
    // Divide o script em comandos individuais
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);

    for (const cmd of commands) {
      try {
        await connection.query(cmd);
      } catch (err) {
        console.error('Erro ao executar comando:', cmd.substring(0, 150) + '...');
        console.error('Erro:', err.message);
      }
    }

    console.log('Script SQL executado com sucesso!');
    await connection.end();
    
  } catch (error) {
    console.error('Erro durante a inicialização do banco:', error);
    process.exit(1);
  }
}

initDatabase().catch(console.error);