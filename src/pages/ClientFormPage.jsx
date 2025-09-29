// src/pages/ClientFormPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Phone, Mail } from 'lucide-react';

function ClientFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('authToken');
            axios.get(`https://api-satelite-sistema.onrender.com/clientes/${id}`, {
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
                await axios.put(`https://api-satelite-sistema.onrender.com/clientes/${id}`, clienteDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Cliente atualizado com sucesso!');
            } else {
                await axios.post('https://api-satelite-sistema.onrender.com/clientes', clienteDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Cliente cadastrado com sucesso!');
            }
            // --- CORREÇÃO AQUI ---
            // O caminho correto para a lista de clientes é dentro do dashboard
            navigate('/dashboard/clientes');
        } catch (error) {
            alert('Erro ao salvar cliente. Verifique se o telefone já não está em uso.');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h1>{id ? 'Editar Cliente' : 'Novo Cliente'}</h1>
            <p>Preencha os dados para {id ? 'atualizar o' : 'cadastrar um novo'} cliente.</p>
            <form onSubmit={handleSubmit} className="modern-form">
                <div className="input-group">
                    <User className="input-icon" />
                    <input type="text" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="input-group">
                    <Phone className="input-icon" />
                    <input type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
                </div>
                <div className="input-group">
                    <Mail className="input-icon" />
                    <input type="email" placeholder="Email (opcional)" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-actions">
                    {/* --- CORREÇÃO AQUI --- */}
                    <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/clientes')}>Cancelar</button>
                    <button type="submit" className="btn-submit">Salvar Cliente</button>
                </div>
            </form>
        </div>
    );
}

export default ClientFormPage;