// src/components/MainLayout.jsx

import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../App.css'; // Usaremos um CSS genérico por enquanto

function MainLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="layout">
            <aside className="sidebar">
                <h2>Menu</h2>
                <nav>
                    <ul>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/produtos">Produtos</Link></li>
                        <li><Link to="/clientes">Clientes</Link></li>
                        <li><Link to="/comandas">Comandas</Link></li>
                        {/* Adicionaremos mais links aqui no futuro */}
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="header">
                    <span>Usuário: Adiel</span>
                    <button onClick={handleLogout}>Sair</button>
                </header>
                <div className="content">
                    {/* O <Outlet> é o lugar onde o conteúdo da página específica será renderizado */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default MainLayout;