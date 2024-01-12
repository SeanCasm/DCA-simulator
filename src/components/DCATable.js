import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/date";
import { monthInvestment } from "../utils/investmentUtils";
import { SummaryContainer } from "./summary/SummaryContainer";
/**
 * Componente que renderiza una tabla con los datos de la estrategia.
 */
export const DCATable = ({ data = [], settings = {} }) => {
  const [finalPortfolio, setFinalPortfolio] = useState(0);
  const [finalInvestment, setFinalInvestment] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setFinalInvestment(monthInvestment(settings.amount, settings.months));
      setFinalPortfolio(data[data.length - 1].portfolioValue);
    }
  }, [data]);
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
                Precio {settings.selectedCoin} ({settings.selectedCurrency})
              </th>
              <th>Invertido</th>
              <th>Valor portafolio</th>
              <th>Ganancias</th>
              <th>% Ganancias</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={index} className={index % 2 !== 0 ? "tr-bg-dark" : ""}>
                <td>{formatDate(d.date)}</td>
                <td>${data[index].coinPrice}</td>
                <td>${monthInvestment(settings.amount, index)}</td>
                <td>${data[index].portfolioValue}</td>
                <td className={data[index].gain >= 0 ? "gain" : "lose"}>
                  ${data[index].gain}
                </td>
                <td className={data[index].gain >= 0 ? "gain" : "lose"}>
                  {data[index].percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
DCATable.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.shape({
    amount: PropTypes.number,
    selectedCoin: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    selectedCurrency: PropTypes.string,
    months: PropTypes.number,
  }),
};
