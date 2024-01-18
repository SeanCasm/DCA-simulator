import { useState } from "react";
import { totalMonths } from "../utils/date";
import axios from "axios";
import { calculateEarnings } from "../utils/investmentUtils";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateSettings, onUpdateStatus } from "../store/tradeSlice";
import { onUpdatePortfolio } from "../store/portfolioSlice";

/**
 * Custom hook para realizar solicitudes a la api de buda
 */
export const useTrades = () => {
  const [coins, setCoins] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const trade = useSelector((state) => state.trade);
  const portfolio = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  const baseURL = process.env.REACT_APP_API_URL;

  const uniqueDataForCurrencies = (data = "", isCoin = true) => {
    let currencies = [];
    let uniqueCoins = [];
    currencies = isCoin
      ? data.markets.map((market) => market.base_currency)
      : data.markets.map((market) => market.quote_currency);

    currencies.forEach((item) => {
      if (!uniqueCoins.includes(item)) {
        uniqueCoins.push(item);
      }
    });
    return uniqueCoins;
  };
  const getMarkets = async () => {
    await axios
      .get(`${baseURL}/markets`)
      .then(({ data }) => {
        const uniqueCoins = uniqueDataForCurrencies(data, true);
        setCoins(uniqueCoins);
        const uniqueCurrencies = uniqueDataForCurrencies(data, false);
        setCurrencies(uniqueCurrencies);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /**
   * Función cuyo objetivo es entregar el listado de transacciones más recientes
   * del mercado indicado
   * @param {*} settings: objeto que contiene los datos ingresados por el usuario
   */
  const getTrades = async (settings = {}) => {
    dispatch(onUpdateStatus("loading"));

    const { selectedCoin, selectedCurrency, startDate, endDate } = settings;
    const marketId = `${selectedCoin}-${selectedCurrency}`;

    let tradesTemporal = [];
    let monthsRange = totalMonths(startDate, endDate);

    const fetchTradeData = async (timestamp, index) => {
      try {
        const params = { timestamp, limit: 1 };
        const { data } = await axios.get(
          `${baseURL}/markets/${marketId}/trades`,
          { params }
        );
        return { index, trades: data.trades };
      } catch (err) {
        console.error(err);
        return { index, trades: [] };
      }
    };

    const promises = Array.from({ length: monthsRange + 1 }, (_, i) => {
      const firstDayOfMonth = new Date(
        startDate.getFullYear(),
        endDate.getMonth() + i,
        1,
        12,
        0,
        0,
        0
      ).getTime();
      return fetchTradeData(firstDayOfMonth, i);
    });

    const resolvedPromises = await Promise.all(promises);

    resolvedPromises.sort((a, b) => a.index - b.index);

    tradesTemporal = resolvedPromises.map((result) => result.trades);

    const { amount, months } = settings;
    const info = calculateEarnings(tradesTemporal, amount, months);

    dispatch(onUpdatePortfolio(info));
    dispatch(onUpdateSettings(settings));
    dispatch(onUpdateStatus("completed"));
  };

  return {
    getTrades,
    trade,
    getMarkets,
    coins,
    currencies,
    portfolio,
  };
};
