// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

function ProductsPage() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [recarregar, setRecarregar] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            const token = localStorage.getItem('authToken');
            setLoading(true);
            try {
                const url = `https://api-satelite-sistema.onrender.com/api/produtos?page=${paginaAtual}&size=10&sort=nome`;
                const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });
                setProdutos(response.data.content);
                setTotalPaginas(response.data.totalPages);
            } catch (err) {
                setError("Erro ao buscar produtos.");
            } finally {
                setLoading(false);
            }
        };
        fetchProdutos();
    }, [paginaAtual, recarregar]);

    const handleExcluir = async (produtoId) => {
        if (!window.confirm("Tem certeza que deseja desativar este produto?")) return;
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:8080/api/produtos/${produtoId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Produto desativado com sucesso!");
            setRecarregar(!recarregar);
        } catch (err) {
            alert("Erro ao desativar produto.");
        }
    };
    
    const handleProximaPagina = () => { if (paginaAtual < totalPaginas - 1) setPaginaAtual(paginaAtual + 1); };
    const handlePaginaAnterior = () => { if (paginaAtual > 0) setPaginaAtual(paginaAtual - 1); };

    if (error) return <p className="error-message">{error}</p>;
    if (loading) return <p>Carregando...</p>;

    const produtosFiltrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <div>
            <div className="actions-header">
                <h1>Produtos</h1>
                <div className="actions-container">
                    <div className="search-wrapper">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Buscar produto..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                    {/* --- CORREÇÃO AQUI --- */}
                    <Link to="/dashboard/produtos/novo" className="btn-novo">
                        <Plus size={18} />
                        Novo Produto
                    </Link>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosFiltrados.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>R$ {produto.preco.toFixed(2)}</td>
                                <td>{produto.quantidadeEmEstoque}</td>
                                <td>
                                    <span className={`status ${produto.ativo ? 'ativo' : 'inativo'}`}>
                                        {produto.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    {/* --- CORREÇÃO AQUI --- */}
                                    <Link to={`/dashboard/produtos/editar/${produto.id}`} className="btn-editar">
                                        <Edit size={16} />
                                    </Link>
                                    <button onClick={() => handleExcluir(produto.id)} className="btn-excluir">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Paginação */}
            <div className="pagination-controls" style={{marginTop: '2rem'}}>
                <button onClick={handlePaginaAnterior} disabled={paginaAtual === 0}>Anterior</button>
                <span>Página {paginaAtual + 1} de {totalPaginas}</span>
                <button onClick={handleProximaPagina} disabled={paginaAtual >= totalPaginas - 1}>Próxima</button>
            </div>
        </div>
    );
}
export default ProductsPage;