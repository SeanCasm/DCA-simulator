import "./App.css";
import { DCAChart } from "./components/DCAChart";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { DCATable } from "./components/DCATable";
import { Settings } from "./components/Settings";
import { useTrades } from "./hooks/useTrades";

export const App = () => {
  const { trade } = useTrades();

  return (
    <main className="container gap-sm d-flex flex-col gap-sm">
      <h1>Simulador DCA </h1>
      <div className="d-flex settings-line">
        <Settings />
        {trade.status === "completed" && <DCAChart />}
      </div>
      {trade.status === "completed" && <DCATable />}
      {trade.status === "loading" && <LoadingSpinner />}
    </main>
  );
};
