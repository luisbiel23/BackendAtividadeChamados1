import { Chamado, Usuario } from '../models/index.js';

export async function abrirChamado(req, res) {
  try {
    const { titulo, descricao, prioridade, categoria } = req.body;

    const chamado = await Chamado.create({
      titulo,
      descricao,
      prioridade,
      categoria,
      id_usuario: req.user.id,
    });

    res.status(201).json(chamado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function verMeusChamados(req, res) {
  try {
    const chamados = await Chamado.findAll({ where: { id_usuario: req.user.id } });
    res.json(chamados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function verTodosChamados(req, res) {
  try {
    if (req.user.perfil !== 'tecnico') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const chamados = await Chamado.findAll({ include: { model: Usuario, as: 'usuario' } });
    res.json(chamados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function atualizarStatus(req, res) {
  try {
    if (req.user.perfil !== 'tecnico') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const { id } = req.params;
    const { status } = req.body;

    const chamado = await Chamado.findByPk(id);
    if (!chamado) return res.status(404).json({ message: 'Chamado não encontrado' });

    chamado.status = status;
    chamado.atualizado_em = new Date();
    await chamado.save();

    res.json(chamado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function excluirChamado(req, res) {
  try {
    const { id } = req.params;  
    const chamado = await Chamado.findByPk(id);
    if (!chamado) return res.status(404).json({ message: 'Chamado não encontrado' });
    if (req.user.perfil !== 'tecnico' && chamado.id_usuario !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    await chamado.destroy();
    res.json({ message: 'Chamado excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}
