// src/utilities/storage.js

// Obtener datos desde localStorage
export const getStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
};

// Guardar datos en localStorage
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

// Actualizar inventario local en base a nombre y cambio de cantidad
export const updateInventory = (itemName, quantityChange) => {
  const inventory = getStorage('inventory');
  const itemIndex = inventory.findIndex(item => item.name === itemName);
  
  if (itemIndex >= 0) {
    const updatedInventory = [...inventory];
    updatedInventory[itemIndex] = {
      ...updatedInventory[itemIndex],
      quantity: updatedInventory[itemIndex].quantity + quantityChange
    };
    saveToStorage('inventory', updatedInventory);
  } else {
    saveToStorage('inventory', [
      ...inventory,
      {
        name: itemName,
        quantity: quantityChange,
        minStock: 5,
        category: 'Nuevo',
        location: 'Por asignar'
      }
    ]);
  }
};