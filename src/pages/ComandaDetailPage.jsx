// src/pages/ComandaDetailPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importa o useNavigate
import { ShoppingCart, User, Hash, CheckCircle, Plus, Loader, AlertCircle, XCircle } from 'lucide-react';

function ComandaDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const [comanda, setComanda] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [produtoSelecionadoId, setProdutoSelecionadoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);

    const fetchComandaDetails = async () => {
        const token = localStorage.getItem('authToken');
        setLoading(true); // Garante que o loading seja reativado a cada busca
        try {
            const response = await axios.get(`http://localhost:8080/comandas/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setComanda(response.data);
        } catch (err) {
            setError("Erro ao buscar detalhes da comanda.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        fetchComandaDetails();
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/produtos?size=200&sort=nome', { headers: { 'Authorization': `Bearer ${token}` } });
                setProdutos(response.data.content);
            } catch (err) {
                console.error("Erro ao buscar produtos", err);
            }
        };
        fetchProdutos();
    }, [id]);

    const handleAdicionarItem = async (e) => {
        e.preventDefault();
        if (!produtoSelecionadoId) return;
        setIsSubmitting(true);
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`http://localhost:8080/comandas/${id}/itens`, { produtoId: parseInt(produtoSelecionadoId), quantidade }, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Item adicionado!");
            fetchComandaDetails(); // Recarrega os dados
            setProdutoSelecionadoId('');
            setQuantidade(1);
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao adicionar item.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleFecharComanda = async () => {
        if (!window.confirm("Tem certeza que deseja fechar esta comanda?")) return;
        setIsSubmitting(true);
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`http://localhost:8080/comandas/${id}/fechar`, {}, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Comanda fechada!");
            fetchComandaDetails();
        } catch (error) {
            alert("Erro ao fechar comanda.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleCancelarComanda = async () => {
        if (!window.confirm("CANCELAR esta comanda? O estoque será estornado.")) return;
        setIsSubmitting(true);
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`http://localhost:8080/comandas/${id}/cancelar`, {}, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Comanda cancelada com sucesso!");
            // --- CORREÇÃO AQUI ---
            navigate('/dashboard/comandas');
        } catch (error) {
            alert("Erro ao cancelar comanda.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!comanda) return <p>Comanda não encontrada.</p>;

    const isComandaAberta = comanda.status === 'ABERTA';
    const totalComanda = comanda.itens.reduce((acc, item) => acc + (item.quantidade * (item.precoUnitarioMomento || item.produto.preco)), 0);

    return (
        <div>
            <div className="detail-header">
                <h1>Comanda #{comanda.id} - {comanda.nomeCliente}</h1>
                <div className="header-info">
                    <div className="info-item"><User size={16} /> {comanda.nomeCliente}</div>
                    <div className={`info-item status ${comanda.status.toLowerCase()}`}>{comanda.status}</div>
                </div>
            </div>

            <div className="comanda-detail-layout">
                <div className="items-list-section">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr><th>Produto</th><th>Qtd.</th><th>Preço Unit.</th><th>Subtotal</th></tr>
                            </thead>
                            <tbody>
                                {comanda.itens.length === 0 ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>Nenhum item adicionado.</td></tr>
                                ) : (
                                    comanda.itens.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.produto.nome}</td><td>{item.quantidade}</td>
                                            <td>R$ {(item.precoUnitarioMomento || item.produto.preco).toFixed(2)}</td>
                                            <td>R$ {(item.quantidade * (item.precoUnitarioMomento || item.produto.preco)).toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="summary-section">
                    {isComandaAberta && (
                        <div className="add-item-form" style={{ marginBottom: '2rem' }}>
                            <h4>Adicionar Novo Item</h4>
                            <form onSubmit={handleAdicionarItem} className="modern-form">
                                <div className="input-group">
                                    <ShoppingCart className="input-icon" />
                                    <select value={produtoSelecionadoId} onChange={e => setProdutoSelecionadoId(e.target.value)} required disabled={isSubmitting}>
                                        <option value="">-- Selecione um produto --</option>
                                        {produtos.filter(p => p.ativo).map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <input type="number" value={quantidade} onChange={e => setQuantidade(parseInt(e.target.value))} min="1" required placeholder="Quantidade" style={{paddingLeft: '1rem'}} disabled={isSubmitting}/>
                                </div>
                                <button type="submit" className="btn-submit" style={{width: '100%', justifyContent: 'center'}} disabled={isSubmitting}>
                                    <Plus size={16}/> {isSubmitting ? 'Adicionando...' : 'Adicionar Item'}
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="summary-card">
                        <h3>Resumo</h3>
                        <div className="total-display"><span>Total</span><strong>R$ {totalComanda.toFixed(2)}</strong></div>
                        {isComandaAberta && (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                <button onClick={handleFecharComanda} className="btn-fechar-comanda" disabled={isSubmitting}>
                                    <CheckCircle size={18} /> {isSubmitting ? 'Processando...' : 'Fechar Comanda'}
                                </button>
                                <button onClick={handleCancelarComanda} className="btn-cancel" style={{justifyContent: 'center'}} disabled={isSubmitting}>
                                    <XCircle size={18} /> {isSubmitting ? 'Cancelando...' : 'Cancelar Comanda'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ComandaDetailPage;