import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Usuario } from '../models/index.js';

dotenv.config();

export async function register(req, res) {
  try {
    const { nome, email, senha, perfil } = req.body;

    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      perfil,
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso', usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ message: 'Senha inválida' });

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
