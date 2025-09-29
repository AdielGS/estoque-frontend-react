// src/pages/ProductFormPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Package, AlignLeft, DollarSign, Archive } from 'lucide-react';

function ProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidadeEmEstoque, setQuantidadeEmEstoque] = useState('');

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('authToken');
            axios.get(`https://api-satelite-sistema.onrender.com/api/produtos/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                const produto = response.data;
                setNome(produto.nome);
                setDescricao(produto.descricao);
                setPreco(produto.preco);
                setQuantidadeEmEstoque(produto.quantidadeEmEstoque);
            })
            .catch(error => console.error("Erro ao buscar dados do produto", error));
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const produtoDados = { 
            nome, 
            descricao, 
            preco: parseFloat(preco), 
            quantidadeEmEstoque: parseInt(quantidadeEmEstoque),
            ativo: true
        };

        try {
            if (id) {
                await axios.put(`https://api-satelite-sistema.onrender.com/api/produtos/${id}`, produtoDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Produto atualizado com sucesso!');
            } else {
                await axios.post('https://api-satelite-sistema.onrender.com/api/produtos', produtoDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Produto cadastrado com sucesso!');
            }
            navigate('/dashboard/produtos');
        } catch (error) {
            alert('Erro ao salvar produto. Verifique os dados e suas permissões.');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h1>{id ? 'Editar Produto' : 'Novo Produto'}</h1>
            <p>Preencha os dados para {id ? 'atualizar o' : 'cadastrar um novo'} produto.</p>
            <form onSubmit={handleSubmit} className="modern-form">
                <div className="input-group">
                    <Package className="input-icon" />
                    <input type="text" placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="input-group">
                    <AlignLeft className="input-icon" />
                    <input type="text" placeholder="Descrição (opcional)" value={descricao} onChange={e => setDescricao(e.target.value)} />
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <DollarSign className="input-icon" />
                        <input type="number" step="0.01" placeholder="Preço (ex: 19.99)" value={preco} onChange={e => setPreco(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <Archive className="input-icon" />
                        <input type="number" placeholder="Estoque" value={quantidadeEmEstoque} onChange={e => setQuantidadeEmEstoque(e.target.value)} required />
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/produtos')}>Cancelar</button>
                    <button type="submit" className="btn-submit">Salvar Produto</button>
                </div>
            </form>
        </div>
    );
}

export default ProductFormPage;