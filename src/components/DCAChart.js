import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { generateMonthsArray } from "../utils/date";
import { monthInvestment } from "../utils/investmentUtils";
import { useTrades } from "../hooks/useTrades";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const DCAChart = () => {
  const [dates, setDates] = useState([]);
  const [portfolioValues, setPortfolioValues] = useState([]);
  const [investmentData, setInvestmentData] = useState();
  const { trade, portfolio } = useTrades();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Portafolio",
        data: [],
        borderColor: "rgba(41, 33, 235, 1)",
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(46, 40, 168, 0.2)", // Ajusta el color y la opacidad del área
      },
      {
        label: "Inversión",
        data: [],
        borderColor: "rgba(71, 245, 20, 1)",
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(79, 197, 43, 0.2)", // Ajusta el color y la opacidad del área
      },
    ],
  });

  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 1,
          callback: (value, index, values) => {
            return dates[index];
          },
        },
      },
      y: {
        type: "linear",
        position: "left",
        ticks: {
          beginAtZero: true, // Comienza desde cero
        },
      },
    },
    plugins: {
      filler: {
        propagate: true,
      },
    },
  };

  const getDates = () => {
    const { startDate, endDate } = trade;
    const datesArray = generateMonthsArray(startDate, endDate);

    setDates(datesArray);
  };

  const getPortfolioValues = () => {
    const p = portfolio.values.map((d, index) => ({
      x: index,
      y: d.portfolioValue,
    }));
    setPortfolioValues(p);
  };

  const getInvestmentValues = () => {
    const { amount } = trade;
    const investment = portfolio.values.map((d, index) => ({
      x: index,
      y: monthInvestment(amount, index),
    }));
    setInvestmentData(investment);
  };

  useEffect(() => {
    if (portfolio.values.length > 0) {
      getDates();
      getPortfolioValues();
      getInvestmentValues();
    }
  }, [portfolio.values]);

  useEffect(() => {
    setChartData((prevData) => ({
      ...prevData,
      labels: dates,
      datasets: [
        {
          ...prevData.datasets[0],
          data: portfolioValues,
        },
        {
          ...prevData.datasets[1],
          data: investmentData,
        },
      ],
    }));
  }, [dates, portfolioValues, investmentData]);

  return (
    <>
      <div className="dca-chart d-flex" data-testid="dca-chart">
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  );
};
