import React, { useState } from 'react';
import { getFromStorage, saveToStorage, updateInventory } from '../utilities/storage';

const TransactionsSection = () => {
  const [transactionType, setTransactionType] = useState('entrada');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    notes: ''
  });
  const [transactions, setTransactions] = useState(getFromStorage('transactions') || []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = getFromStorage('currentUser')[0] || { name: 'Desconocido' };
    const newTransaction = {
      id: Date.now(),
      type: transactionType,
      item: formData.item,
      quantity: parseInt(formData.quantity),
      date: new Date().toISOString().split('T')[0],
      responsible: currentUser.name,
      notes: formData.notes
    };

    // Update inventory
    const quantityChange = transactionType === 'entrada' 
      ? parseInt(formData.quantity) 
      : -parseInt(formData.quantity);
    updateInventory(formData.item, quantityChange);

    // Save transaction
    const updatedTransactions = [...transactions, newTransaction];
    saveToStorage('transactions', updatedTransactions);
    setTransactions(updatedTransactions);

    // Reset form
    setShowForm(false);
    setFormData({ item: '', quantity: '', notes: '' });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Entradas y Salidas</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Nueva Transacción
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="font-medium mb-3">Registrar {transactionType === 'entrada' ? 'Entrada' : 'Salida'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                <input
                  type="text"
                  name="item"
                  value={formData.item}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                  required
                  min="1"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                rows="2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${t.type === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {t.type === 'entrada' ? 'Entrada' : 'Salida'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.responsible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsSection;

// DONE