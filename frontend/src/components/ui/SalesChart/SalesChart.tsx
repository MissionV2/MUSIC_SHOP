import React from "react";

interface SalesChartProps {
  data: { label: string; value: number }[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => (
  <div>
    <h4>График продаж</h4>
    {/* Здесь может быть интеграция с chart.js или другим графическим компонентом */}
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default SalesChart;