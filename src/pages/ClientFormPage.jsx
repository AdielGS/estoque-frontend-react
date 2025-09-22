// src/pages/ClientFormPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function ClientFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('authToken');
            axios.get(`http://localhost:8080/clientes/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                const cliente = response.data;
                setNome(cliente.nome);
                setTelefone(cliente.telefone);
                setEmail(cliente.email);
            })
            .catch(error => console.error("Erro ao buscar dados do cliente", error));
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const clienteDados = { nome, telefone, email };

        try {
            if (id) {
                await axios.put(`http://localhost:8080/clientes/${id}`, clienteDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Cliente atualizado com sucesso!');
            } else {
                await axios.post('http://localhost:8080/clientes', clienteDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Cliente cadastrado com sucesso!');
            }
            navigate('/clientes');
        } catch (error) {
            alert('Erro ao salvar cliente. Verifique se o telefone já não está em uso.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <input type="text" id="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button type="submit">Salvar Cliente</button>
            </form>
        </div>
    );
}

export default ClientFormPage;