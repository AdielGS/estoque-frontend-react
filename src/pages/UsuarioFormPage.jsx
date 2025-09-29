// src/pages/UsuarioFormPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Mail, Lock, Shield } from 'lucide-react';

function UsuarioFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('FUNCIONARIO'); // Padrão é funcionário

    // No modo de edição, não buscamos a senha por segurança
    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('authToken');
            axios.get(`https://api-satelite-sistema.onrender.com/usuarios/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    const usuario = response.data;
                    setLogin(usuario.login);
                    setEmail(usuario.email);
                    setRole(usuario.role);
                });
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        
        // Apenas envia a senha se for um novo usuário ou se o campo foi preenchido
        const usuarioDados = id ? { email, role } : { login, email, senha, role };

        try {
            if (id) {
                // Lógica de atualização (não vamos implementar agora para simplificar)
                alert('Funcionalidade de atualização de usuário a ser implementada.');
            } else {
                await axios.post('http://localhost:8080/usuarios', usuarioDados, { headers: { 'Authorization': `Bearer ${token}` } });
                alert('Usuário cadastrado com sucesso!');
            }
            navigate('/dashboard/usuarios');
        } catch (error) {
            alert('Erro ao salvar usuário. Verifique se o login ou email já não está em uso.');
        }
    };

    return (
        <div className="form-container">
            <h1>{id ? 'Editar Usuário' : 'Novo Usuário'}</h1>
            <p>Preencha os dados para {id ? 'atualizar o' : 'cadastrar um novo'} usuário.</p>
            <form onSubmit={handleSubmit} className="modern-form">
                <div className="input-group">
                    <User className="input-icon" />
                    <input type="text" placeholder="Login de acesso" value={login} onChange={e => setLogin(e.target.value)} required disabled={!!id} />
                </div>
                <div className="input-group">
                    <Mail className="input-icon" />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                {!id && ( // O campo senha só aparece ao criar um novo usuário
                    <div className="input-group">
                        <Lock className="input-icon" />
                        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
                    </div>
                )}
                <div className="input-group">
                    <Shield className="input-icon" />
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="FUNCIONARIO">Funcionário</option>
                        <option value="GERENTE">Gerente</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/usuarios')}>Cancelar</button>
                    <button type="submit" className="btn-submit">Salvar Usuário</button>
                </div>
            </form>
        </div>
    );
}

export default UsuarioFormPage;