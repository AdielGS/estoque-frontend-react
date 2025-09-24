// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // Se NÃO HÁ token, redireciona o utilizador para a página de login
        return <Navigate to="/login" />;
    }

    // Se HÁ um token, permite que o componente filho (a página) seja renderizado
    return children;
};

export default ProtectedRoute;