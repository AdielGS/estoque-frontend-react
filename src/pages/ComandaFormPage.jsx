// src/pages/ComandaFormPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';

function ComandaFormPage() {
    const [clientes, setClientes] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [nomeOcasional, setNomeOcasional] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientes = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('http://localhost:8080/clientes', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setClientes(response.data);
            } catch (error) {
                console.error("Erro ao buscar clientes", error);
            }
        };
        fetchClientes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const dadosComanda = {
            clienteId: clienteId ? parseInt(clienteId) : null,
            nomeClienteOcasional: nomeOcasional
        };

        if (!dadosComanda.clienteId && !dadosComanda.nomeClienteOcasional) {
            alert('Por favor, selecione um cliente cadastrado ou informe o nome de um cliente ocasional.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/comandas', dadosComanda, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Comanda aberta com sucesso!');
            // --- CORREÇÃO AQUI ---
            // Navega para a página de detalhes da comanda recém-criada
            navigate(`/dashboard/comandas/${response.data.id}`);
        } catch (error) {
            alert('Erro ao abrir comanda. Verifique os dados.');
            console.error(error);
        }
    };

    const handleClienteChange = (e) => {
        setClienteId(e.target.value);
        if (e.target.value) {
            setNomeOcasional('');
        }
    };

    const handleNomeOcasionalChange = (e) => {
        setNomeOcasional(e.target.value);
        if (e.target.value) {
            setClienteId('');
        }
    };

    return (
        <div className="form-container">
            <h1>Abrir Nova Comanda</h1>
            <p>Selecione um cliente ou insira um nome para iniciar uma nova comanda.</p>
            <form onSubmit={handleSubmit} className="modern-form">
                <div className="input-group">
                    <Users className="input-icon" />
                    <select value={clienteId} onChange={handleClienteChange} disabled={!!nomeOcasional}>
                        <option value="">-- Selecione um cliente cadastrado --</option>
                        {clientes.filter(c => c.ativo).map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="divider-text">
                    <span>OU</span>
                </div>
                <div className="input-group">
                    <UserPlus className="input-icon" />
                    <input
                        type="text"
                        placeholder="Nome do Cliente Ocasional"
                        value={nomeOcasional}
                        onChange={handleNomeOcasionalChange}
                        disabled={!!clienteId}
                    />
                </div>
                <div className="form-actions">
                    {/* --- CORREÇÃO AQUI --- */}
                    <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/comandas')}>Cancelar</button>
                    <button type="submit" className="btn-submit">Abrir Comanda</button>
                </div>
            </form>
        </div>
    );
}

export default ComandaFormPage;