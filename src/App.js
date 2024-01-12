import { useEffect, useState } from "react";
import "./App.css";
import { DCAChart } from "./components/DCAChart";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { DCATable } from "./components/DCATable";
import { Settings } from "./components/Settings";
import { useTrades } from "./hooks/useTrades";
import { calculateEarnings } from "./utils/investmentUtils";
import { SummaryContainer } from "./components/summary/SummaryContainer";

export const App = () => {
  const { getTrades, trades } = useTrades();
  const [settings, setSettings] = useState(undefined);
  const [status, setStatus] = useState("default");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (settings) {
      const { selectedCoin, selectedCurrency, startDate, endDate } = settings;
      if (selectedCoin && selectedCurrency) {
        const marketId = `${selectedCoin}-${selectedCurrency}`;
        getTrades(marketId, startDate, endDate);
      }
    }
  }, [settings]);

  useEffect(() => {
    if (settings)
      if (trades.length === settings.months) {
        const { amount, months } = settings;
        const info = calculateEarnings(trades, amount, months);
        setData(info);
        setStatus("loaded");
      }
  }, [trades]);

  return (
    <main className="container gap-sm d-flex flex-col gap-sm">
      <h1>Simulador DCA </h1>
      <div className="d-flex settings-line">
        <Settings setSettings={setSettings} setStatus={setStatus} />
        {status === "loaded" && <DCAChart data={data} settings={settings} />}
      </div>
      {status === "loaded" && <DCATable data={data} settings={settings} />}
      {status === "loading" && <LoadingSpinner />}
    </main>
  );
};
