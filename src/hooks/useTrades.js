import { useState } from "react";
import { totalMonths } from "../utils/date";
import axios from "axios";

/**
 * Custom hook para realizar solicitudes a la api de buda
 */
export const useTrades = () => {
  const [trades, setTrades] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL;
  /**
   * Función cuyo objetivo es entregar el listado de transacciones más recientes
   * del mercado indicado
   * @param {*} marketId: id del mercado indicado
   * @param {*} startDate fecha inicial del rango
   * @param {*} endDate fecha final del rango
   */
  const getTrades = async (
    marketId = "BTC-CLP",
    startDate = new Date(),
    endDate
  ) => {
    /**
     * Resetea los trades en caso de nueva consulta, asi se
     * actualiza el sitio para renderizar los cambios.
     */
    setTrades([]);
    let months = 0;

    startDate.setUTCHours(12, 0, 0, 0);
    months = totalMonths(startDate, endDate);
    console.log(months);
    for (let i = 0; i <= months; i++) {
      /**
       * Establece la fecha al primer día del mes actual "i",
       * de esta forma va obteniendo el primer dia de cada mes
       * segun el rango de tiempo que se haya solicitado.
       */
      const firstDayOfMonth = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + i,
        1,
        12,
        0,
        0,
        0
      );
      await axios
        .get(`${baseURL}/markets/${marketId}/trades`, {
          params: {
            timestamp: firstDayOfMonth.getTime(),
            limit: 1,
          },
        })
        .then(({ data }) => {
          setTrades((old) => [...old, data.trades]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return { getTrades, trades };
};
