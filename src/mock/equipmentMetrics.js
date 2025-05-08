const equipmentMetrics = [
  {
    id: 1,
    equipmentId: 1,
    name: "Microscopio",
    metrics: [
      { name: "Temperatura", value: "23°C", status: "normal" },
      { name: "Humedad", value: "45%", status: "normal" }
    ]
  },
  {
    id: 2,
    equipmentId: 2,
    name: "Incubadora",
    metrics: [
      { name: "Temperatura", value: "37°C", status: "normal" },
      { name: "CO2", value: "5%", status: "normal" },
      { name: "Humedad", value: "85%", status: "alto" }
    ]
  }
];

export default equipmentMetrics;