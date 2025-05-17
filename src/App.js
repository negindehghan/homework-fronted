import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Bills from './components/Bills';
import Payments from './components/Payments';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'bills':
        return <Bills />;
      case 'payments':
        return <Payments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <nav className="nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'bills' ? 'active' : ''} 
          onClick={() => setActiveTab('bills')}
        >
          Bills
        </button>
        <button 
          className={activeTab === 'payments' ? 'active' : ''} 
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
      </nav>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
