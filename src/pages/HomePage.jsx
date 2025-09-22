// src/pages/HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o token do localStorage
        localStorage.removeItem('authToken');
        // Navega de volta para a tela de login
        navigate('/login');
    };

    return (
        <div>
            <h1>Bem-vindo ao Sistema de Estoque!</h1>
            <p>Você está logado.</p>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

export default HomePage;