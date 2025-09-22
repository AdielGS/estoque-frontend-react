// src/pages/ClientsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

function ClientsPage() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [recarregar, setRecarregar] = useState(false);

    // Adaptação: Vamos implementar a paginação no backend para clientes depois.
    // Por enquanto, vamos buscar todos. A lógica de paginação pode ser adicionada depois.
    useEffect(() => {
        const fetchClientes = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError("Usuário não autenticado.");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const url = `http://localhost:8080/clientes`;
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setClientes(response.data);
            } catch (err) {
                setError("Erro ao buscar clientes. Verifique suas permissões.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, [recarregar]);

    const handleExcluir = async (clienteId) => {
        if (!window.confirm("Tem certeza que deseja desativar este cliente?")) {
            return;
        }

        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:8080/clientes/${clienteId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("Cliente desativado com sucesso!");
            setRecarregar(!recarregar);
        } catch (err) {
            alert("Erro ao desativar cliente.");
            console.error(err);
        }
    };

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <div className="actions-header">
                <Link to="/clientes/novo" className="btn-novo">
                    Adicionar Novo Cliente
                </Link>
            </div>
            {loading ? (
                <p>Carregando clientes...</p>
            ) : (
                <table className="products-table">
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
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.ativo ? 'Ativo' : 'Inativo'}</td>
                                <td className="actions-cell">
                                    <Link to={`/clientes/editar/${cliente.id}`} className="btn-editar">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn-excluir"
                                        onClick={() => handleExcluir(cliente.id)}
                                    >
                                        Desativar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ClientsPage;