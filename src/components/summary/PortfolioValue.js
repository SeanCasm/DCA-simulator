import React from "react";
import PropTypes from "prop-types";

export const PortfolioValue = ({ value }) => {
  return (
    <div className="portfolio-box">
      <p>{value}</p>
      <p>Valor portafolio</p>
    </div>
  );
};
PortfolioValue.propTypes = {
  value: PropTypes.number,
};
