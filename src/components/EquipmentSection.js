import React from 'react';
import equipment from '../mock/equipment';

const EquipmentSection = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Equipos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipment.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className={`text-sm ${item.status === 'Operativo' ? 'text-green-600' : 'text-yellow-600'}`}>
              Estado: {item.status}
            </p>
            <p className="text-sm text-gray-600">Última calibración: {item.lastCalibration}</p>
            <p className="text-sm text-gray-600">Próxima calibración: {item.nextCalibration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentSection;