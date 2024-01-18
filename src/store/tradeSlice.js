import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 20000,
  selectedCoin: "BTC",
  startDate: "",
  endDate: "",
  selectedCurrency: "CLP",
  months: 12,
  trades: [],
  status: "default",
};

export const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    onUpdateSettings: (state, { payload }) => {
      const {
        amount,
        selectedCoin,
        startDate,
        endDate,
        selectedCurrency,
        months,
      } = payload;
      state.amount = amount;
      state.selectedCoin = selectedCoin;
      state.startDate = startDate;
      state.endDate = endDate;
      state.selectedCurrency = selectedCurrency;
      state.months = months;
    },
    onUpdateTrades: (state, { payload }) => {
      state.trades = payload;
    },
    onUpdateStatus: (state, { payload }) => {
      state.status = payload;
    },
    onResetTrade: (state, { payload }) => {
      state = initialState;
    },
  },
});

export const {
  onUpdateSettings,
  onUpdateTrades,
  onResetTrade,
  onUpdateStatus,
} = tradeSlice.actions;
