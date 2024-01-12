/**
 * Entrega el total de meses que hay entre las fechas inicial y final
 * seleccionadas, incluyendo el mes inicial y final.
 * @param {*} startDate fecha inicial
 * @param {*} endDate fecha final
 * @returns
 */
export const totalMonths = (startDate, endDate) => {
  if (startDate && endDate) {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  }
};
export const generateMonthsArray = (startDate, endDate) => {
  const months = [];
  let currentMonth = startDate.getMonth() + 1;
  let currentYear = startDate.getFullYear();

  while (
    currentYear <= endDate.getFullYear() ||
    (currentYear === endDate.getFullYear() &&
      currentMonth <= endDate.getMonth())
  ) {
    // Incrementa currentMonth en 1 para mostrar el número de mes correcto
    const formattedMonth = currentMonth.toString().padStart(2, "0");
    months.push(`${formattedMonth}/${currentYear}`);

    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }
  }

  return months;
};

/**
 * Da formato al timestamp MM-YYYY
 * @param {*} timestamp
 * @returns fecha con el formato MM-YYYY aplicado.
 */
export const formatDate = (timestamp) => {
  const formattedDate = new Date(Number(timestamp)).toLocaleDateString(
    "es-CL",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
  const formattedDateWithSlashes = formattedDate.replace(/-/g, "/");

  return formattedDateWithSlashes;
};
