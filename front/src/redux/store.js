import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middlewares/apiErrors";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: {
    user: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
