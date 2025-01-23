import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";

// Register all Chart.js components
ChartJS.register(...registerables);

interface ChartProps {
  type: "line" | "bar" | "pie" | "doughnut" | "radar" | "polarArea";
  data: any;
  options?: any;
  className?: string;
}

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  options,
  className,
}) => {
  return (
    <ReactChart
      className={className}
      data={data}
      options={options}
      type={type}
    />
  );
};
