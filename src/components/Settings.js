import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { totalMonths } from "../utils/date";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Componente que muestra el panel para configurar la solicitud de la estrategia DCA.
 */
export const Settings = ({ setSettings, setStatus }) => {
  const [coins, setCoins] = useState(["BTC"]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState(20000);
  const [months, setMonths] = useState(12);
  const [currencies, setCurrencies] = useState(["CLP"]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const [endDate, setEndDate] = useState(null);

  const currentDate = new Date();

  // Calcula la fecha actual menos 1 año
  const maxStartDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth()
  );
  const [startDate, setStartDate] = useState(null);

  /**
   * Establece la fecha final minima posible segun la fecha inicial seleccionada.
   * @returns fecha final minima.
   */
  const minEndDate = (start = new Date()) => {
    return new Date(start.getFullYear(), start.getMonth() + 12);
  };

  /**
   * Actualiza la fecha inicial para establecer el rango de tiempo.
   * @param {*} date
   */
  const handleStartDateChange = (date) => {
    setStartDate(date);
    const newEndDate = minEndDate(date);
    setEndDate(newEndDate);
    if (date === null) {
      setEndDate(null);
    }
  };
  /**
   * Actualiza las variables de la configuración para hacer la solicitud a la api
   */
  const startSimulation = (event) => {
    event.preventDefault();
    setSettings({
      amount,
      selectedCoin,
      startDate,
      endDate,
      selectedCurrency,
      months,
    });
    setStatus("loading");
  };
  /**
   * Actualiza la fecha final para establecer el rango de tiempo.
   * @param {*} date
   */
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setMonths(totalMonths(startDate, date));
  };
  /**
   * Actualiza el monto a invertir mediante el input.
   * @param {*} event
   */
  const handleAmountChange = (event) => {
    let amount = Number.parseInt(event.target.value);
    if (amount <= 0) {
      amount = event.target.value = 1;
    }
    setAmount(amount);
  };

  useEffect(() => {
    //Hacer peticion a una API para obtener listado de coins
    setCoins(["BTC"]);
    //Hacer peticion a una API para obtener las divisas
    setCurrencies(["CLP"]);

    //Selecciona Bitcoin y la divisa CLP por defecto para efectos de esta tarea
    setSelectedCoin(coins[0]);
    setSelectedCurrency(currencies[0]);
  }, []);

  return (
    <form
      className="d-flex flex-col gap-sm settings"
      onSubmit={(event) => startSimulation(event)}
      data-testid="settings"
    >
      <header className="header d-flex flex-col gap-sm">
        <p>
          Rendimiento histórico del DCA al comprar {selectedCoin}{" "}
          <strong>MENSUALMENTE</strong> con ${amount} {selectedCurrency} durante
          los últimos {months} meses.
        </p>
      </header>
      <section className="config-box d-flex flex-col box-shadow gap-sm">
        <div>
          <label htmlFor="coin">Moneda</label>
          <br />
          <select
            className="select-lg"
            name="coin"
            id="coin"
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            {coins.map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount">Monto</label>
          <br />
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <select
            className="select-md "
            name="currency"
            id="currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          placeholderText="---Start date---"
          selectsStart
          startDate={currentDate}
          endDate={endDate}
          maxDate={maxStartDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
        <DatePicker
          selected={endDate}
          disabled={startDate === null}
          onChange={handleEndDateChange}
          placeholderText="---End date---"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          maxDate={currentDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
        <button type="submit" disabled={endDate === null || startDate === null}>
          Simular
        </button>
      </section>
    </form>
  );
};
Settings.propTypes = {
  setSettings: PropTypes.func,
  setStatus: PropTypes.func,
};
