import Usuario from './Usuario.js';
import Chamado from './Chamado.js';

Usuario.hasMany(Chamado, { foreignKey: 'id_usuario', as: 'chamados' });
Chamado.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

export { Usuario, Chamado };
