import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import foundationsReducer from "./foundations";
import petsReducer from "./pets";
import userReducer from "./user";
import idReducer from './id'

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      user: userReducer,
      pets: petsReducer,
      foundations: foundationsReducer,
      id: idReducer,
      },
  });

export default store;
