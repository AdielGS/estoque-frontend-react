// src/components/MainLayout.jsx
import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Users, FileText, LogOut, UserCog } from 'lucide-react';

function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Lemos o perfil e o nome do utilizador do localStorage
    const userRole = localStorage.getItem('userRole');
    const userLogin = localStorage.getItem('userLogin'); // <-- NOVA LINHA

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userLogin'); // <-- NOVA LINHA (limpar tudo)
        navigate('/login');
    };

    const menuItems = [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/dashboard/produtos', icon: Package, label: 'Produtos' },
        { path: '/dashboard/clientes', icon: Users, label: 'Clientes' },
        { path: '/dashboard/comandas', icon: FileText, label: 'Comandas' },
    ];
    
    if (userRole === 'GERENTE') {
        menuItems.push({ path: '/dashboard/usuarios', icon: UserCog, label: 'Utilizadores' });
    }
    
    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout">
            <aside className="sidebar">
                {/* ... (código do sidebar continua igual) ... */}
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        Clube<span className="text-highlight">Satelite</span>
                    </div>
                </div>
                <nav>
                    <ul>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.path}>
                                    <Link to={item.path} className={isActive(item.path) ? 'active' : ''}>
                                        <Icon size={20} />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="header">
                    {/* --- CORREÇÃO AQUI --- */}
                    <div className="user-info">
                        <span>Bem-vindo, <strong>{userLogin || 'Usuário'}</strong>!</span>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={16} />
                        <span>Sair</span>
                    </button>
                </header>
                <div className="content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default MainLayout;