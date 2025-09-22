// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // 1. Busca o token no localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
        // 2. Se NÃO HÁ token, redireciona o usuário para a página de login
        return <Navigate to="/login" />;
    }

    // 3. Se HÁ um token, permite que o componente filho (a página) seja renderizado
    return children;
};

export default ProtectedRoute;