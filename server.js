import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';

// Rotas
import authRoutes from './routes/authRoutes.js';
import chamadoRoutes from './routes/chamadoRoutes.js';

// Models 
import './models/index.js';

const app = express();

app.use(express.json());

app.use(cors({
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use('/auth', authRoutes);
app.use('/chamados', chamadoRoutes);

// Testar conexão com o banco e iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com banco estabelecida!');

    await sequelize.sync({ alter: true });
    console.log('📦 Models sincronizados');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao conectar no banco:', err);
  }
}

startServer();
