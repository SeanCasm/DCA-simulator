import React from "react";
import PropTypes from "prop-types";
export const MoneyInvestment = ({ investment = 0 }) => {
  return (
    <div className="portfolio-box">
      <p>{investment}</p>
      <p>Inversión</p>
    </div>
  );
};
MoneyInvestment.propTypes = {
  investment: PropTypes.number,
};
