// src/components/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // Se o utilizador já tem um token, redireciona-o para o dashboard
        return <Navigate to="/dashboard" />;
    }
    // Se não tem token, mostra a página de login
    return children;
};

export default PublicRoute;