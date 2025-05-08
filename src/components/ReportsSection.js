import React from 'react';

const ReportsSection = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Reportes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Inventario bajo</h3>
          <p className="text-2xl font-bold text-red-600">3 items</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Equipos en mantenimiento</h3>
          <p className="text-2xl font-bold text-yellow-600">1</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium">Envíos este mes</h3>
          <p className="text-2xl font-bold text-blue-600">5</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;