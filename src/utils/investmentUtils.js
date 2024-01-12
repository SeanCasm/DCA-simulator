/**
 * Entrega la cifra total de inversión acumulada hasta determinado mes.
 * @param {*} amountInvestment cantidad de dinero a invertir cada mes.
 * @param {*} monthIndex el indice del mes.
 * @returns monto total invertido hasta cierto mes
 */
export const monthInvestment = (amountInvestment, monthIndex) => {
  return Math.floor(amountInvestment * (monthIndex + 1));
};
/**
 * Obtiene el precio de una moneda segun el primer dia de cada mes, considerando
 * el precio de la última transacción.
 * @param {*} trade objeto el cual es entregado por la api de buda el cual contiene
 * las trasacciones.
 * @returns
 */
const price = (trade) => {
  const lastEntry = trade.entries.find((e) => e[0] === trade.last_timestamp);
  return Math.round(lastEntry[2]);
};
/**
 * Se calculan las ganancias mes a mes del dinero invertido, estableciendo los montos
 * y porcentajes obtenidos y actualizando el valor del portafolio según las ganancias o pérdidas
 * @param {*} trades objeto el cual es entregado por la api de buda el cual contiene
 * las trasacciones.
 * @param {*} investment monto invertido mes a mes.
 * @param {*} totalMonths total de meses para calcular.
 * @returns
 */
export const calculateEarnings = (trades = [], investment = 1, totalMonths) => {
  /**
   * Se establece y actualiza un arreglo el cual contendrá los valores solicitados para
   * mostrar en la tabla renderizada en el componente DCATAble.
   */

  /**
   * El primer mes por defecto no se ven cambios en ganancias ni en el portafolio,
   * es luego de transcurrido este mes donde se pueden calcular las ganancias o perdidas
   * según suba o baje el valor de la moneda seleccionada.
   */
  const newInfo = [
    {
      portfolioValue: investment,
      gain: 0,
      percentage: 0,
      coinPrice: price(trades[0]),
      date: trades[0].timestamp,
    },
  ];
  /**
   * Itera desde el 2 mes para hacer los calculos.
   */
  for (let i = 1; i < totalMonths; i++) {
    //precio de la moneda en el mes anterior "i-1".
    const prevMonthPrice = price(trades[i - 1]);
    //precio de la moneda en el mes actual "i".
    const actualMonthPrice = price(trades[i]);
    //diferencia del precio del mes actual - mes anterior.
    const diffPrevCurrentMonth = actualMonthPrice - prevMonthPrice;

    //porcentaje del cambio de valor de la moneda, puede ser positivo o negativo.
    const priceIncrement = (diffPrevCurrentMonth / prevMonthPrice) * 100;
    //monto total invertido hasta el mes actual "i".
    const inv = monthInvestment(investment, i);
    //valor del mes anterior del portafolio
    const prevPortfolio = newInfo[i - 1].portfolioValue;

    //obtiene el valor del mes actual del portafolio aplicando el cambio%.
    let currentPortfolioValue =
      investment + prevPortfolio + prevPortfolio * (priceIncrement / 100);
    currentPortfolioValue = Math.floor(currentPortfolioValue);

    //diferencia del valor del portafolio y del monto invertido hasta el mes actual.
    const gain = currentPortfolioValue - inv;
    //cambio% del mes.
    const percentage = -(1 - currentPortfolioValue / inv) * 100;

    newInfo.push({
      portfolioValue: currentPortfolioValue,
      gain,
      percentage,
      coinPrice: actualMonthPrice,
      date: trades[i].timestamp,
    });
  }
  return newInfo;
};
