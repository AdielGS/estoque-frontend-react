// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Package, Users, FileText, DollarSign, BarChart2, PieChart } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function HomePage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('http://localhost:8080/dashboard/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setStats(response.data);
            } catch (error) {
                console.error("Erro ao buscar estatísticas do dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // --- A CORREÇÃO ESTÁ AQUI ---
    // A lista de cards agora só é criada depois de sabermos se os dados chegaram.
    const statCards = [
        { 
            title: "Produtos Ativos", 
            value: stats ? stats.totalProdutos : '...', // Se 'stats' existe, usa o valor. Senão, mostra '...'.
            icon: Package, 
            color: "blue" 
        },
        { 
            title: "Clientes Ativos", 
            value: stats ? stats.totalClientes : '...', 
            icon: Users, 
            color: "green" 
        },
        { 
            title: "Comandas Abertas", 
            value: stats ? stats.comandasAbertas : '...', 
            icon: FileText, 
            color: "orange" 
        },
        { 
            title: "Vendas Hoje", 
            // A formatação do preço só acontece se 'stats' e 'stats.vendasHoje' existirem.
            value: stats && stats.vendasHoje !== null ? `R$ ${stats.vendasHoje.toFixed(2)}` : '...', 
            icon: DollarSign, 
            color: "purple" 
        }
    ];

    // Dados mockados para os gráficos (podem ser substituídos por dados da API no futuro)
    const barChartData = { labels: ['Jan', 'Fev', 'Mar'], datasets: [{ label: 'Vendas', data: [1250, 1900, 3000], backgroundColor: 'rgba(30, 58, 138, 0.7)' }]};
    const doughnutChartData = { labels: ['Eletrônicos', 'Bebidas'], datasets: [{ data: [300, 50], backgroundColor: ['#1e3a8a', '#f1b748'] }]};
    const chartOptions = { responsive: true, plugins: { legend: { display: false } } };

    if (loading && !stats) return <p>Carregando dashboard...</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="dashboard-grid">
                <div className="stats-container">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className={`stat-card stat-card-${stat.color}`}>
                                <div className="stat-icon"><Icon size={22} /></div>
                                <div className="stat-content">
                                    <h3>{stat.value}</h3>
                                    <p>{stat.title}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="chart-container main-chart">
                    <div className="chart-header">
                        <BarChart2 size={18} /> <h3>Vendas Recentes</h3>
                    </div>
                    <Bar options={chartOptions} data={barChartData} />
                </div>
                <div className="chart-container side-chart">
                    <div className="chart-header">
                        <PieChart size={18} /> <h3>Categorias Populares</h3>
                    </div>
                    <Doughnut data={doughnutChartData} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;