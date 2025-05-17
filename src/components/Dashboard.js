import React, { useState, useEffect } from 'react';
import { fetchDashboardSummary } from '../services/api';

const Dashboard = () => {
    const [summary, setSummary] = useState({
        totalBills: 0,
        pendingBills: 0,
        totalAmount: 0,
        paidAmount: 0,
        balance: 0
    });

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await fetchDashboardSummary();
                setSummary(data);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            }
        };
        loadDashboard();
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Bills</h3>
                    <p>{summary.totalBills}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Bills</h3>
                    <p>{summary.pendingBills}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Amount</h3>
                    <p>${summary.totalAmount}</p>
                </div>
                <div className="stat-card">
                    <h3>Paid Amount</h3>
                    <p>${summary.paidAmount}</p>
                </div>
                <div className="stat-card">
                    <h3>Balance</h3>
                    <p>${summary.balance}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 