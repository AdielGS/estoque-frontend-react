// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

function LoginPage() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // SUBSTITUA A SUA FUNÇÃO 'handleSubmit' POR ESTA:
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/login', { login, senha });
            
            // AGORA GUARDAMOS O TOKEN E O PERFIL
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userLogin', response.data.login);
            
            navigate('/dashboard');

        } catch (error) {
            alert('Falha no login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-art-section">
                {/* Esta seção é para uma imagem ou arte visual em telas grandes */}
            </div>
            <div className="login-form-section">
                <div className="login-form-wrapper">
                    <div className="login-logo">
                        Clube<span className="text-highlight">Satelite</span>
                    </div>
                    <div className="login-header">
                        <h1>Bem-vindo!</h1>
                        <p>Acesse o painel de gestão.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Usuário</label>
                            <div className="input-with-icon">
                                <User className="input-icon" size={18} />
                                <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} required disabled={loading} placeholder="seu.usuario" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <div className="input-with-icon">
                                <Lock className="input-icon" size={18} />
                                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required disabled={loading} placeholder="********" />
                            </div>
                        </div>
                        <button type="submit" className="btn-novo" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;