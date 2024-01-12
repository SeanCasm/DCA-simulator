import React, { useEffect, useState } from "react";

export const InvestmentSummary = ({ portfolio = 0, investment = 0 }) => {
  const [difference, setDifference] = useState(0);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const diff = portfolio - investment;
    setPercentage(((diff / investment) * 100).toFixed(2));
    setDifference(diff);
  }, [portfolio, investment]);
  return (
    <div className="portfolio-box">
      <p className={difference >= 0 ? "earn" : "lose"}>${difference}</p>
      <p className={difference >= 0 ? "earn" : "lose"}>{percentage}%</p>
    </div>
  );
};
