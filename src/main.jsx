// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa TODAS as suas páginas a partir da pasta 'pages'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductFormPage from './pages/ProductFormPage';
import ClientsPage from './pages/ClientsPage';
import ClientFormPage from './pages/ClientFormPage';
import ComandasPage from './pages/ComandasPage';
import ComandaFormPage from './pages/ComandaFormPage';
import ComandaDetailPage from './pages/ComandaDetailPage';
import UsuariosPage from './pages/UsuariosPage'; // Importe
import UsuarioFormPage from './pages/UsuarioFormPage'; // Importe

// Importa os componentes de layout e rota da pasta 'components'
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import './index.css';
import './App.css';

const router = createBrowserRouter([
  // ROTA 1: A PÁGINA INICIAL, PÚBLICA
  {
    path: "/",
    element: <LandingPage />,
  },
  // ROTA 2: A PÁGINA DE LOGIN, PROTEGIDA PARA NÃO SER ACEDIDA POR QUEM JÁ ESTÁ LOGADO
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  // ROTA 3: O PAINEL DE CONTROLO, PROTEGIDO PARA SÓ SER ACEDIDO POR QUEM ESTÁ LOGADO
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    // Estas são as páginas que aparecerão DENTRO do layout principal
    children: [
      { path: "", element: <HomePage /> },
      { path: "produtos", element: <ProductsPage /> },
      { path: "produtos/novo", element: <ProductFormPage /> },
      { path: "produtos/editar/:id", element: <ProductFormPage /> },
      { path: "clientes", element: <ClientsPage /> },
      { path: "clientes/novo", element: <ClientFormPage /> },
      { path: "clientes/editar/:id", element: <ClientFormPage /> },
      { path: "comandas", element: <ComandasPage /> },
      { path: "comandas/novo", element: <ComandaFormPage /> },
      { path: "comandas/:id", element: <ComandaDetailPage /> },
      { path: "usuarios", element: <UsuariosPage /> },
      { path: "usuarios/novo", element: <UsuarioFormPage /> },
      { path: "usuarios/editar/:id", element: <UsuarioFormPage /> },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);