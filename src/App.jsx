// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css'; // <-- GARANTA QUE ESTA LINHA ESTEJA AQUI

function App() {
  // A partir da versão 6.4 do react-router-dom, o App.jsx
  // pode ser usado como um layout raiz se configurado no roteador,
  // mas vamos manter o roteador em main.jsx por enquanto.
  // Esta estrutura simplificada garante que os estilos sejam carregados.
  // O <Outlet /> viria aqui se estivéssemos aninhando rotas dentro de App.
  return null; // O roteador em main.jsx está no controle.
}

// A sua estrutura de roteador em main.jsx já está ótima!
// O importante é que algum arquivo raiz, como o App.jsx ou o main.jsx,
// importe o App.css.
// Verifique se a importação está em `src/main.jsx` se não estiver aqui.
export default App;