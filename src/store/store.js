import { configureStore } from "@reduxjs/toolkit";
import { tradeSlice } from "./tradeSlice";
import { portfolioSlice } from "./portfolioSlice";
import { dateMiddleware } from "./dateMiddleware";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(dateMiddleware);

export const store = configureStore({
  reducer: {
    trade: tradeSlice.reducer,
    portfolio: portfolioSlice.reducer,
  },
  middleware,
});
