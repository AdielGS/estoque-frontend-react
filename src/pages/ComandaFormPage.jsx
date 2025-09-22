// src/pages/ComandaFormPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ComandaFormPage() {
    // Estado para guardar a lista de clientes que virá da API
    const [clientes, setClientes] = useState([]);
    
    // Estados para controlar os campos do formulário
    const [clienteId, setClienteId] = useState('');
    const [nomeOcasional, setNomeOcasional] = useState('');
    
    const navigate = useNavigate();

    // Este useEffect vai buscar a lista de clientes assim que a página carregar
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

        // Prepara os dados para enviar para a API
        const dadosComanda = {
            // Se um clienteId foi selecionado, envia. Senão, envia nulo.
            clienteId: clienteId ? parseInt(clienteId) : null,
            nomeClienteOcasional: nomeOcasional
        };

        try {
            const response = await axios.post('http://localhost:8080/comandas', dadosComanda, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            alert('Comanda aberta com sucesso!');
            // Futuramente, vamos navegar para a página de detalhes da comanda criada
            // Por enquanto, voltamos para a lista de comandas.
            navigate('/comandas');
            
        } catch (error) {
            alert('Erro ao abrir comanda. Verifique os dados.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Abrir Nova Comanda</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="cliente">Selecionar Cliente Cadastrado</label>
                    <select id="cliente" value={clienteId} onChange={e => setClienteId(e.target.value)}>
                        <option value="">-- Selecione --</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <p><strong>OU</strong></p>

                <div className="form-group">
                    <label htmlFor="nomeOcasional">Nome do Cliente Ocasional</label>
                    <input type="text" id="nomeOcasional" value={nomeOcasional} onChange={e => setNomeOcasional(e.target.value)} />
                </div>
                
                <button type="submit">Abrir Comanda</button>
            </form>
        </div>
    );
}

export default ComandaFormPage;