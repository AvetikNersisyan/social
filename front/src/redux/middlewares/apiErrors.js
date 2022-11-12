export const logger = (store) => {
  return (next) => {
    return (action) => {
      next(action);
    };
  };
};
