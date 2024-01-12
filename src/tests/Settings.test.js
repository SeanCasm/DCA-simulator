import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Settings } from "../components/Settings";
import { totalMonths } from "../utils/date";

describe("Settings", () => {
  test("Renders Settings component", () => {
    const setSettings = jest.fn();
    const setStatus = jest.fn();
    const amount = 20000;
    const startDatePlaceHolder = "---Start date---";
    const endDatePlaceHolder = "---End date---";
    const selectedCoin = "BTC";
    const startDate = new Date("Sat Jan 01 2022 00:00:00 GMT-0300");
    const endDate = new Date("Sun Jan 01 2023 00:00:00 GMT-0300");
    const months = totalMonths(startDate, endDate);

    render(<Settings setSettings={setSettings} setStatus={setStatus} />);

    // Verifica que los elementos del formulario estén presentes
    expect(screen.getByLabelText(/Moneda/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monto/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(startDatePlaceHolder)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(endDatePlaceHolder)).toBeInTheDocument();

    // Simula la interacción del usuario
    fireEvent.change(screen.getByLabelText(/Monto/i), {
      target: { value: amount },
    });
    fireEvent.change(screen.getByLabelText(/Moneda/i), {
      target: { value: selectedCoin },
    });

    fireEvent.input(screen.getByPlaceholderText(startDatePlaceHolder), {
      target: { value: startDate },
    });

    fireEvent.input(screen.getByPlaceholderText(endDatePlaceHolder), {
      target: { value: endDate },
    });

    fireEvent.click(screen.getByText(/Simular/i));
    // Verifica que las funciones prop se llamen correctamente con los valores esperados
    expect(setSettings).toHaveBeenCalledWith({
      amount,
      selectedCoin,
      startDate,
      endDate,
      selectedCurrency: "CLP",
      months,
    });
    expect(setStatus).toHaveBeenCalledWith("loading");
  });
});
