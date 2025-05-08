import React, { useState } from 'react';
import InventorySection from './InventorySection';
import EquipmentSection from './EquipmentSection';
import ReportsSection from './ReportsSection';
import TransactionsSection from './TransactionsSection';
import EquipmentMonitoringSection from './EquipmentMonitoringSection';

const LayoutMainDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  const renderSection = () => {
    switch(activeTab) {
      case 'inventory':
        return <InventorySection />;
      case 'equipment':
        return <EquipmentSection />;
      case 'monitoring':
        return <EquipmentMonitoringSection />;
      case 'transactions':
        return <TransactionsSection />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <InventorySection />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">LabMaster Pro</h1>
            <div className="flex items-center space-x-4">
              <span className="text-lg">{currentUser?.avatar}</span>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
                <p className="text-xs font-medium text-gray-500 capitalize">{currentUser?.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          <div className="mt-4 flex space-x-4 overflow-x-auto">
            {['inventory', 'equipment', 'monitoring', 'transactions', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'inventory' && 'Inventario'}
                {tab === 'equipment' && 'Equipos'}
                {tab === 'monitoring' && 'Monitoreo'}
                {tab === 'transactions' && 'Movimientos'}
                {tab === 'reports' && 'Reportes'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderSection()}
      </main>
    </div>
  );
};

export default LayoutMainDashboard;

// DONE