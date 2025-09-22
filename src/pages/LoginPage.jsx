// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import '../App.css';

function LoginPage() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate(); // Inicializa o hook

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { login, senha });
            console.log('Login bem-sucedido!', response.data);

            // Salva o token
            localStorage.setItem('authToken', response.data.token);
            
            // Navega para a página principal
            navigate('/'); 

        } catch (error) {
            console.error('Erro no login:', error);
            alert('Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="App">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login do Sistema</h1>
                <div className="form-group">
                    <label htmlFor="login">Usuário</label>
                    <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginPage;