import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  perfil: {
    type: DataTypes.ENUM('usuario', 'tecnico'),
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

export default Usuario;
