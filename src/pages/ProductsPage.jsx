// src/pages/ProductsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductsPage() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    
    // RECARREGADOR DE DADOS:
    // Para evitar repetir a lógica de busca, vamos colocar um estado que força o useEffect a rodar de novo.
    const [recarregar, setRecarregar] = useState(false);

    useEffect(() => {
        const fetchProdutos = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError("Usuário não autenticado.");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const url = `http://localhost:8080/api/produtos?page=${paginaAtual}&size=5&sort=nome`;
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProdutos(response.data.content);
                setTotalPaginas(response.data.totalPages);
            } catch (err) {
                setError("Erro ao buscar produtos.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [paginaAtual, recarregar]); // Agora o useEffect também re-executa quando 'recarregar' muda.

    // --- NOVA FUNÇÃO PARA EXCLUIR PRODUTO ---
    const handleExcluir = async (produtoId) => {
        // Pede confirmação antes de uma ação destrutiva
        if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
            return;
        }

        const token = localStorage.getItem('authToken');
        try {
            // Chama o endpoint DELETE da nossa API
            await axios.delete(`http://localhost:8080/api/produtos/${produtoId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            alert("Produto excluído com sucesso!");
            
            // Força o recarregamento da lista para refletir a exclusão
            setRecarregar(!recarregar); 

        } catch (err) {
            alert("Erro ao excluir produto. Verifique se você tem permissão (GERENTE).");
            console.error(err);
        }
    };


    const handleProximaPagina = () => {
        if (paginaAtual < totalPaginas - 1) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const handlePaginaAnterior = () => {
        if (paginaAtual > 0) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Lista de Produtos</h1>
            {loading ? (
                <p>Carregando produtos...</p>
            ) : (
                <>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Ações</th> {/* <-- NOVA COLUNA */}
                            </tr>
                        </thead>
                       <tbody>
    {produtos.map(produto => (
        <tr key={produto.id}>
            <td>{produto.id}</td>
            <td>{produto.nome}</td>
            <td>R$ {produto.preco.toFixed(2)}</td>
            <td>{produto.quantidadeEmEstoque}</td>
            <td className="actions-cell"> {/* Adicionei uma classe para estilizar se quiser */}
                {/* O NOVO LINK DE EDIÇÃO */}
                <Link to={`/produtos/editar/${produto.id}`} className="btn-editar">
                    Editar
                </Link>
                <button 
                    className="btn-excluir" 
                    onClick={() => handleExcluir(produto.id)}
                >
                    Excluir
                </button>
            </td>
        </tr>
    ))}
</tbody>
                    </table>

                    <div className="pagination-controls">
                        <button onClick={handlePaginaAnterior} disabled={paginaAtual === 0}>
                            Página Anterior
                        </button>
                        <span> Página {paginaAtual + 1} de {totalPaginas} </span>
                        <button onClick={handleProximaPagina} disabled={paginaAtual >= totalPaginas - 1}>
                            Próxima Página
                        </button>
                    </div>
                </>
            )}
            <div>
            <h1>Lista de Produtos</h1>

            {/* 2. ADICIONE O BOTÃO/LINK AQUI */}
            <div className="actions-header">
                <Link to="/produtos/novo" className="btn-novo">
                    Adicionar Novo Produto
                </Link>
            </div>
            
            {loading ? (
                <p>Carregando produtos...</p>
            ) : (
                <>
                    {/* ... sua tabela e controles de paginação ... */}
                </>
            )}
        </div>
        </div>
    );
    
}

export default ProductsPage;