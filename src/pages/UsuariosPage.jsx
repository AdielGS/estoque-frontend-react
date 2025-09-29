// src/pages/UsuariosPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recarregar, setRecarregar] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            const token = localStorage.getItem('authToken');
            setLoading(true);
            try {
                const url = `https://api-satelite-sistema.onrender.com/usuarios`;
                const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });
                setUsuarios(response.data);
            } catch (err) {
                setError("Erro ao buscar usuários. Verifique suas permissões.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, [recarregar]);

    const handleDesativar = async (usuarioId) => {
        if (!window.confirm("Tem certeza que deseja desativar este usuário?")) return;
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:8080/usuarios/${usuarioId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Usuário desativado com sucesso!");
            setRecarregar(!recarregar);
        } catch (err) {
            alert("Erro ao desativar usuário.");
        }
    };

    if (error) return <p className="error-message">{error}</p>;
    if (loading) return <p>Carregando...</p>;

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.login.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <div>
            <div className="actions-header">
                <h1>Usuários do Sistema</h1>
                <div className="actions-container">
                    <div className="search-wrapper">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por login..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                    <Link to="/dashboard/usuarios/novo" className="btn-novo">
                        <Plus size={18} />
                        Novo Usuário
                    </Link>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Login</th>
                            <th>Email</th>
                            <th>Perfil (Role)</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.login}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.role}</td>
                                <td>
                                    <span className={`status ${usuario.ativo ? 'ativo' : 'inativo'}`}>
                                        {usuario.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <Link to={`/dashboard/usuarios/editar/${usuario.id}`} className="btn-editar">
                                        <Edit size={16} />
                                    </Link>
                                    <button onClick={() => handleDesativar(usuario.id)} className="btn-excluir">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UsuariosPage;