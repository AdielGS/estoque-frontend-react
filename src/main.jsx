// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Imports
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductFormPage from './pages/ProductFormPage'; // <-- Importa a nova página
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout'; // <-- Importa o novo layout
import ClientsPage from './pages/ClientsPage'; // <-- IMPORTE A PÁGINA DE LISTA
import ClientFormPage from './pages/ClientFormPage';
import ComandasPage from './pages/ComandasPage';
import ComandaFormPage from './pages/ComandaFormPage';
import ComandaDetailPage from './pages/ComandaDetailPage';

import './index.css';

// Nova estrutura de rotas aninhadas
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    // A rota raiz agora é um "container" que usa o MainLayout
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    // As páginas que devem aparecer DENTRO do layout são definidas como 'children'
    children: [
      { path: "", element: <HomePage />, },
      { path: "produtos", element: <ProductsPage />, },
      { path: "produtos/novo", element: <ProductFormPage /> },
      { path: "produtos/editar/:id", element: <ProductFormPage /> },
      { path: "clientes", element: <ClientsPage /> },
      { path: "clientes/novo", element: <ClientFormPage /> },
      { path: "clientes/editar/:id", element: <ClientFormPage /> },
      { path: "comandas", element: <ComandasPage /> },
      { path: "comandas/novo", element: <ComandaFormPage /> },
      { path: "comandas/:id", element: <ComandaDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);