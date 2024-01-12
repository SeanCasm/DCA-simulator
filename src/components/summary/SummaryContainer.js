import React from "react";
import { PortfolioValue } from "./PortfolioValue";
import { InvestmentSummary } from "./InvestmentSummary";
import { MoneyInvestment } from "./MoneyInvestment";

export const SummaryContainer = ({
  finalPortfolio = 0,
  finalInvestment = 0,
}) => {
  return (
    <div className="d-flex justify-center ">
      <MoneyInvestment investment={finalInvestment} />
      <InvestmentSummary
        portfolio={finalPortfolio}
        investment={finalInvestment}
      />
      <PortfolioValue value={finalPortfolio} />
    </div>
  );
};
