// import React, { useRef, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import Chart from "chart.js"; // Importez Chart à partir de 'chart.js'
// import "../../assets/style/Home.css";

// const BarChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       chartRef.current.chartInstance.destroy();
//     }

//     const chartOptions = {
//       plugins: {
//         legend: {
//           display: true,
//           position: "bottom",
//         },
//         title: {
//           text: "akory",
//           display: true,
//           fontSize: 20,
//         },
//       },
//     };

//     const chartData = {
//       labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "August"],
//       datasets: [
//         {
//           label: "Rainfall",
//           backgroundColor: "rgba(75,192,192,1)",
//           borderColor: "rgba(0,0,0,1)",
//           borderWidth: 2,
//           data: [65, 45, 23, 33, 53, 123, 43, 87],
//         },
//       ],
//     };

//     const newChartInstance = new Chart(chartRef.current, {
//       type: "bar",
//       data: chartData,
//       options: chartOptions,
//     });

//     return () => {
//       newChartInstance.destroy();
//     };
//   }, []);

//   return (
//     <div className="barchartContainer">
//       <Bar ref={chartRef} data={{}} options={{}} />
//       <p style={{ textAlign: "center" }}>Chart</p>
//     </div>
//   );
// };

// export default BarChart;
import React from 'react';


export default function BarChart() {
  return (
    <div>
    vvv
    </div>
  )
}
