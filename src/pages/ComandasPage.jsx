// src/pages/ComandasPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

function ComandasPage() {
    const [comandas, setComandas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComandas = async () => {
            const token = localStorage.getItem('authToken');
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/comandas', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setComandas(response.data);
            } catch (err) {
                setError("Erro ao buscar comandas.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComandas();
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Gestão de Comandas</h1>
            <div className="actions-header">
                {/* Futuramente, este link levará para o formulário de abrir comanda */}
                <Link to="/comandas/novo" className="btn-novo">Abrir Nova Comanda</Link>
            </div>
            {loading ? (
                <p>Carregando comandas...</p>
            ) : (
                <div className="comandas-grid">
    {comandas.map(comanda => (
        // AQUI ESTÁ A MUDANÇA:
        <Link to={`/comandas/${comanda.id}`} key={comanda.id} className="comanda-card-link">
            <div className={`comanda-card ${comanda.status.toLowerCase()}`}>
                <h3>Comanda #{comanda.id}</h3>
                <p><strong>Cliente:</strong> {comanda.nomeCliente}</p>
                <p><strong>Status:</strong> {comanda.status}</p>
                <p><strong>Abertura:</strong> {new Date(comanda.dataAbertura).toLocaleString()}</p>
                <p><strong>Itens:</strong> {comanda.itens.length}</p>
            </div>
        </Link>
    ))}
</div>
            )}
        </div>
    );
}

export default ComandasPage;