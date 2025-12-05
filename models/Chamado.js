import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Chamado = sequelize.define('Chamado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  prioridade: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('aberto', 'em_andamento', 'concluido'),
    defaultValue: 'aberto',
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  atualizado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'chamados',
  timestamps: false,
});

export default Chamado;
