import sequelize from './config/database.js';

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco realizada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error);
  }
}

testConnection();
