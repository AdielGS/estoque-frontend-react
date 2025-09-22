// src/pages/ProductFormPage.jsx

import React, { useState, useEffect } from 'react'; // Importa o useEffect
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Importa o useParams
import '../App.css';

function ProductFormPage() {
    // useParams pega os parâmetros da URL, como o :id
    const { id } = useParams(); 
    const navigate = useNavigate();

    // Os estados continuam os mesmos
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidadeEmEstoque, setQuantidadeEmEstoque] = useState('');

    // NOVO: Este useEffect roda se um 'id' for encontrado na URL
    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('authToken');
            // Busca os dados do produto específico para preencher o formulário
            axios.get(`http://localhost:8080/api/produtos/${id}`, {
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
    }, [id]); // Roda sempre que o 'id' mudar

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const produtoDados = { nome, descricao, preco: parseFloat(preco), quantidadeEmEstoque: parseInt(quantidadeEmEstoque) };

        try {
            if (id) {
                // Se TEM um id, estamos EDITANDO -> Requisição PUT
                await axios.put(`http://localhost:8080/api/produtos/${id}`, produtoDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Produto atualizado com sucesso!');
            } else {
                // Se NÃO TEM um id, estamos CRIANDO -> Requisição POST
                await axios.post('http://localhost:8080/api/produtos', produtoDados, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Produto cadastrado com sucesso!');
            }
            navigate('/produtos'); // Redireciona para a lista após o sucesso
        } catch (error) {
            alert('Erro ao salvar produto. Verifique os dados e suas permissões.');
            console.error(error);
        }
    };

    return (
        <div>
            {/* O título da página agora é dinâmico */}
            <h1>{id ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h1>
            <form onSubmit={handleSubmit} className="product-form">
                {/* O resto do formulário é exatamente o mesmo */}
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="preco">Preço (ex: 19.99)</label>
                    <input type="number" step="0.01" id="preco" value={preco} onChange={e => setPreco(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="quantidade">Quantidade em Estoque</label>
                    <input type="number" id="quantidade" value={quantidadeEmEstoque} onChange={e => setQuantidadeEmEstoque(e.target.value)} required />
                </div>
                <button type="submit">Salvar Produto</button>
            </form>
        </div>
    );
}

export default ProductFormPage;