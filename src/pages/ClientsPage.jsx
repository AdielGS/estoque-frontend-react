// src/pages/ClientsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

function ClientsPage() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recarregar, setRecarregar] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');

    useEffect(() => {
        const fetchClientes = async () => {
            const token = localStorage.getItem('authToken');
            setLoading(true);
            try {
                const url = `https://api-satelite-sistema.onrender.com/clientes`;
                const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });
                setClientes(response.data);
            } catch (err) {
                setError("Erro ao buscar clientes.");
            } finally {
                setLoading(false);
            }
        };
        fetchClientes();
    }, [recarregar]);

    const handleExcluir = async (clienteId) => {
        if (!window.confirm("Tem certeza que deseja desativar este cliente?")) return;
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:8080/clientes/${clienteId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Cliente desativado com sucesso!");
            setRecarregar(!recarregar);
        } catch (err) {
            alert("Erro ao desativar cliente.");
        }
    };

    if (error) return <p className="error-message">{error}</p>;
    if (loading) return <p>Carregando...</p>;

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <div>
            <div className="actions-header">
                <h1>Clientes</h1>
                <div className="actions-container">
                    <div className="search-wrapper">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                    {/* --- CORREÇÃO AQUI --- */}
                    <Link to="/dashboard/clientes/novo" className="btn-novo">
                        <Plus size={18} />
                        Novo Cliente
                    </Link>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <span className={`status ${cliente.ativo ? 'ativo' : 'inativo'}`}>
                                        {cliente.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    {/* --- CORREÇÃO AQUI --- */}
                                    <Link to={`/dashboard/clientes/editar/${cliente.id}`} className="btn-editar">
                                        <Edit size={16} />
                                    </Link>
                                    <button onClick={() => handleExcluir(cliente.id)} className="btn-excluir">
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
export default ClientsPage;