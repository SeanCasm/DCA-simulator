export const dateMiddleware = (store) => (next) => (action) => {
  let newAction = { ...action };
  if (action.type === "trade/onUpdateSettings") {
    const { startDate, endDate } = action.payload;
    newAction.payload.startDate = startDate.getTime();
    newAction.payload.endDate = endDate.getTime();
  }

  return next(newAction);
};
