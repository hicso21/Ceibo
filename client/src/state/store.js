import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import foundationsReducer from "./fundations";
import petsReducer from "./pets";
import userReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      user: userReducer,
      pets: petsReducer,
      fundations: foundationsReducer,
      },
  });

export default store;
