import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    // Verifica que el título esté presente
    expect(screen.getByText("Simulador DCA")).toBeInTheDocument();

    // Verifica que el componente Settings esté presente
    expect(screen.getByTestId("settings")).toBeInTheDocument();

    // Verifica que el componente DCAChart no esté presente inicialmente
    expect(screen.queryByTestId("dca-chart")).toBeNull();

    // Verifica que el componente DCATable no esté presente inicialmente
    expect(screen.queryByTestId("dca-table")).toBeNull();
  });
});
