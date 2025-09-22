// src/pages/ComandaDetailPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function ComandaDetailPage() {
    const { id } = useParams(); // Pega o ID da comanda da URL
    const navigate = useNavigate();

    // Estados da página
    const [comanda, setComanda] = useState(null);
    const [produtos, setProdutos] = useState([]); // Lista de produtos para adicionar
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados do formulário de adicionar item
    const [produtoSelecionadoId, setProdutoSelecionadoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);

    // Função para recarregar os dados da comanda (após adicionar item, fechar, etc)
    const fetchComandaDetails = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`http://localhost:8080/comandas/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setComanda(response.data);
        } catch (err) {
            setError("Erro ao buscar detalhes da comanda.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para buscar os dados da comanda e a lista de produtos
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setLoading(true);

        // Busca os detalhes da comanda
        fetchComandaDetails();

        // Busca a lista de todos os produtos para o dropdown
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/produtos', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProdutos(response.data.content);
            } catch (err) {
                console.error("Erro ao buscar produtos", err);
            }
        };
        fetchProdutos();
    }, [id]);

    // --- FUNÇÕES DE AÇÃO ---

    const handleAdicionarItem = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const dadosItem = { produtoId: parseInt(produtoSelecionadoId), quantidade };
        try {
            await axios.post(`http://localhost:8080/comandas/${id}/itens`, dadosItem, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("Item adicionado com sucesso!");
            fetchComandaDetails(); // Recarrega os detalhes da comanda para mostrar o novo item
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao adicionar item. Verifique o estoque.");
            console.error(error);
        }
    };

    const handleFecharComanda = async () => {
        if (!window.confirm("Tem certeza que deseja fechar esta comanda?")) return;
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`http://localhost:8080/comandas/${id}/fechar`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("Comanda fechada com sucesso!");
            fetchComandaDetails(); // Recarrega para mostrar o status 'FECHADA'
        } catch (error) {
            alert("Erro ao fechar comanda.");
            console.error(error);
        }
    };

    const handleCancelarComanda = async () => {
        if (!window.confirm("Tem certeza que deseja CANCELAR esta comanda? O estoque será estornado.")) return;
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`http://localhost:8080/comandas/${id}/cancelar`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("Comanda cancelada com sucesso!");
            navigate('/comandas'); // Volta para a lista após cancelar
        } catch (error) {
            alert("Erro ao cancelar comanda.");
            console.error(error);
        }
    };

    if (loading) return <p>Carregando detalhes da comanda...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!comanda) return <p>Comanda não encontrada.</p>;

    const isComandaAberta = comanda.status === 'ABERTA';

    return (
        <div>
            <h1>Detalhes da Comanda #{comanda.id}</h1>
            <div className="comanda-details-header">
                <p><strong>Cliente:</strong> {comanda.nomeCliente}</p>
                <p><strong>Status:</strong> <span className={comanda.status.toLowerCase()}>{comanda.status}</span></p>
                <p><strong>Total:</strong> R$ {comanda.valorTotal ? comanda.valorTotal.toFixed(2) : '0.00'}</p>
            </div>

            <h2>Itens na Comanda</h2>
            <table className="products-table">
                <thead>
                    <tr><th>Produto</th><th>Qtd.</th><th>Preço Unit.</th><th>Subtotal</th></tr>
                </thead>
                <tbody>
                    {comanda.itens.map(item => (
                        <tr key={item.id}>
                            <td>{item.produto.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>R$ {item.precoUnitarioMomento.toFixed(2)}</td>
                            <td>R$ {(item.quantidade * item.precoUnitarioMomento).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulário para adicionar novos itens (só aparece se a comanda estiver aberta) */}
            {isComandaAberta && (
                <form onSubmit={handleAdicionarItem} className="add-item-form">
                    <h2>Adicionar Novo Item</h2>
                    <select value={produtoSelecionadoId} onChange={e => setProdutoSelecionadoId(e.target.value)} required>
                        <option value="">Selecione um produto</option>
                        {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} (Estoque: {p.quantidadeEmEstoque})</option>)}
                    </select>
                    <input type="number" value={quantidade} onChange={e => setQuantidade(parseInt(e.target.value))} min="1" required />
                    <button type="submit">Adicionar Item</button>
                </form>
            )}

            {/* Botões de ação (só aparecem se a comanda estiver aberta) */}
            {isComandaAberta && (
                <div className="comanda-actions">
                    <button onClick={handleFecharComanda} className="btn-fechar">Fechar Comanda</button>
                    <button onClick={handleCancelarComanda} className="btn-excluir">Cancelar Comanda</button>
                </div>
            )}
        </div>
    );
}

export default ComandaDetailPage;