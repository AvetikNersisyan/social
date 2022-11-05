export const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log(store.getState(), "triggered");
      console.log(action, "action");
      next(action);
    };
  };
};
