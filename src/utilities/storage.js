// Exportamos las funciones individualmente
export const getStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

export const updateInventory = (itemName, quantityChange) => {
  const inventory = getStorage('inventory');
  const itemIndex = inventory.findIndex(item => item.name === itemName);
  
  if (itemIndex >= 0) {
    const updatedInventory = [...inventory];
    updatedInventory[itemIndex] = {
      ...updatedInventory[itemIndex],
      quantity: updatedInventory[itemIndex].quantity + quantityChange
    };
    setStorage('inventory', updatedInventory);
  } else {
    setStorage('inventory', [
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