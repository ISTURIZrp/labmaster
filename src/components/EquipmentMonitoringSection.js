import React, { useState } from 'react';
import { getFromStorage, saveToStorage } from '../utilities/storage';

const EquipmentMonitoringSection = () => {
  const [equipmentMetrics, setEquipmentMetrics] = useState(() => {
    const storedMetrics = getFromStorage('equipmentMetrics');
    return storedMetrics.length > 0 ? storedMetrics : [
      {
        id: 1,
        name: "Microscopio",
        metrics: [
          { name: "Temperatura", value: "23°C", status: "normal" },
          { name: "Humedad", value: "45%", status: "normal" }
        ]
      }
    ];
  });
  
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    metrics: [
      { name: 'Temperatura', value: '', status: 'normal' },
      { name: 'Humedad', value: '', status: 'normal' }
    ]
  });

  const handleAddMetric = () => {
    setNewEquipment(prev => ({
      ...prev,
      metrics: [...prev.metrics, { name: '', value: '', status: 'normal' }]
    }));
  };

  const handleMetricChange = (index, field, value) => {
    const updatedMetrics = [...newEquipment.metrics];
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value };
    setNewEquipment(prev => ({ ...prev, metrics: updatedMetrics }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const equipmentToAdd = {
      id: Date.now(),
      name: newEquipment.name,
      metrics: newEquipment.metrics.filter(m => m.name && m.value)
    };

    const updatedEquipment = [...equipmentMetrics, equipmentToAdd];
    saveToStorage('equipmentMetrics', updatedEquipment);
    setEquipmentMetrics(updatedEquipment);
    setShowAddEquipment(false);
    setNewEquipment({
      name: '',
      metrics: [
        { name: 'Temperatura', value: '', status: 'normal' },
        { name: 'Humedad', value: '', status: 'normal' }
      ]
    });
  };

  const handleAddReading = (equipmentId) => {
    const updatedEquipment = equipmentMetrics.map(equip => {
      if (equip.id === equipmentId) {
        return {
          ...equip,
          metrics: equip.metrics.map(metric => ({
            ...metric,
            value: (Math.random() * 10 + 20).toFixed(1) + (metric.name === 'Temperatura' ? '°C' : '%'),
            status: ['normal', 'alto', 'bajo'][Math.floor(Math.random() * 3)]
          }))
        };
      }
      return equip;
    });
    saveToStorage('equipmentMetrics', updatedEquipment);
    setEquipmentMetrics(updatedEquipment);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Monitoreo de Equipos</h2>
        <button 
          onClick={() => setShowAddEquipment(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Agregar Equipo
        </button>
      </div>

      {showAddEquipment && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="font-medium mb-3">Agregar Nuevo Equipo</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Equipo</label>
              <input
                type="text"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Métricas</label>
              {newEquipment.metrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-3 gap-3 mb-2">
                  <input
                    type="text"
                    placeholder="Nombre métrica"
                    value={metric.name}
                    onChange={(e) => handleMetricChange(index, 'name', e.target.value)}
                    className="border rounded-md p-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Valor"
                    value={metric.value}
                    onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                    className="border rounded-md p-2"
                    required
                  />
                  <select
                    value={metric.status}
                    onChange={(e) => handleMetricChange(index, 'status', e.target.value)}
                    className="border rounded-md p-2"
                  >
                    <option value="normal">Normal</option>
                    <option value="alto">Alto</option>
                    <option value="bajo">Bajo</option>
                  </select>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMetric}
                className="mt-2 px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
              >
                + Agregar Métrica
              </button>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddEquipment(false)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipmentMetrics.map((equipment) => (
          <div key={equipment.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg mb-3">{equipment.name}</h3>
              <button 
                onClick={() => handleAddReading(equipment.id)}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
              >
                Simular Lectura
              </button>
            </div>
            <div className="space-y-3">
              {equipment.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{metric.name}:</span>
                  <span className={`text-sm font-medium ${
                    metric.status === 'normal' ? 'text-green-600' : 
                    metric.status === 'alto' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentMonitoringSection;

// DONE