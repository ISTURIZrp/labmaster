import React, { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utilities/storage';

const InventorySection = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const loadInventory = () => {
      const storedInventory = getStorage('inventory');
      if (!storedInventory || storedInventory.length === 0) {
        // Datos iniciales de ejemplo
        const initialInventory = [
          {
            id: 1,
            name: "Tubos de ensayo",
            category: "Vidriería",
            quantity: 15,
            minStock: 10,
            location: "Estante A1"
          },
          {
            id: 2,
            name: "Pipetas",
            category: "Vidriería",
            quantity: 8,
            minStock: 5,
            location: "Estante A2"
          }
        ];
        setStorage('inventory', initialInventory);
        setInventory([...initialInventory]);
      } else {
        setInventory([...storedInventory]);
      }
    };

    loadInventory();
  }, []);

  const handleQuantityChange = (id, change) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity < 0 ? 0 : newQuantity
        };
      }
      return item;
    });
    
    setStorage('inventory', updatedInventory);
    setInventory(updatedInventory);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Inventario</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id} className={item.quantity < item.minStock ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantity < item.minStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      -
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventorySection;

// DONE