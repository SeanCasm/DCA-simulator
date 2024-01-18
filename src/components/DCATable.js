import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/date";
import { monthInvestment } from "../utils/investmentUtils";
import { SummaryContainer } from "./summary/SummaryContainer";
import { useTrades } from "../hooks/useTrades";
/**
 * Componente que renderiza una tabla con los datos de la estrategia.
 */
export const DCATable = () => {
  const { portfolio, trade } = useTrades();
  const [finalPortfolio, setFinalPortfolio] = useState(0);
  const [finalInvestment, setFinalInvestment] = useState(0);

  useEffect(() => {
    if (portfolio.values.length > 0) {
      const { amount, months } = trade;
      setFinalInvestment(monthInvestment(amount, months));
      const lastIndex = portfolio.values.length - 1;
      setFinalPortfolio(portfolio.values[lastIndex].portfolioValue);
    }
  }, [portfolio.values]);
  return (
    <main data-testid="dca-table ">
      <SummaryContainer
        finalInvestment={finalInvestment}
        finalPortfolio={finalPortfolio}
      />
      <div className="text-center">
        <h2>Tabla de resultados</h2>
      </div>
      <div className="table-overflow">
        <table className="box-shadow table">
          <thead>
            <tr className="tr-bg-dark">
              <th>Fecha</th>
              <th>
                Precio {trade.selectedCoin} ({trade.selectedCurrency})
              </th>
              <th>Invertido</th>
              <th>Valor portafolio</th>
              <th>Ganancias</th>
              <th>% Ganancias</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.values.map((d, index) => (
              <tr key={index} className={index % 2 !== 0 ? "tr-bg-dark" : ""}>
                <td>{formatDate(d.date)}</td>
                <td>${portfolio.values[index].coinPrice}</td>
                <td>${monthInvestment(trade.amount, index)}</td>
                <td>${portfolio.values[index].portfolioValue}</td>
                <td
                  className={
                    portfolio.values[index].gain >= 0 ? "gain" : "lose"
                  }
                >
                  ${portfolio.values[index].gain}
                </td>
                <td
                  className={
                    portfolio.values[index].gain >= 0 ? "gain" : "lose"
                  }
                >
                  {portfolio.values[index].percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
