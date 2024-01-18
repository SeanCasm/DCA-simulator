import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: [],
};
export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    onUpdatePortfolio: (state, { payload }) => {
      state.values = payload;
    },
  },
});

export const { onUpdatePortfolio } = portfolioSlice.actions;
