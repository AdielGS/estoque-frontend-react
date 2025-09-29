// src/pages/ComandasPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

function ComandasPage() {
    const [comandas, setComandas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComandas = async () => {
            const token = localStorage.getItem('authToken');
            setLoading(true);
            try {
                const response = await axios.get('https://api-satelite-sistema.onrender.com/comandas', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setComandas(response.data);
            } catch (err) {
                setError("Erro ao buscar comandas.");
            } finally {
                setLoading(false);
            }
        };
        fetchComandas();
    }, []);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <div className="actions-header">
                <h1>Comandas</h1>
                {/* --- CORREÇÃO AQUI --- */}
                <Link to="/dashboard/comandas/novo" className="btn-novo">
                    <Plus size={18} />
                    Abrir Comanda
                </Link>
            </div>
            <div className="comandas-grid">
                {comandas.map(comanda => (
                    // --- CORREÇÃO AQUI ---
                    <Link to={`/dashboard/comandas/${comanda.id}`} key={comanda.id} className="comanda-card-link">
                        <div className={`comanda-card ${comanda.status.toLowerCase()}`}>
                            <h3>Comanda #{comanda.id}</h3>
                            <p><strong>Cliente:</strong> {comanda.nomeCliente}</p>
                            <p><strong>Status:</strong> {comanda.status}</p>
                            <p><strong>Itens:</strong> {comanda.itens.length}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ComandasPage;