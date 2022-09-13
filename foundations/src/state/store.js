import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import petsReducer from "./pets";
import userReducer from "./user";
import idReducer from './id'
import searchReducer from "../../../client/src/state/search";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      user: userReducer,
      pets: petsReducer,
      id: idReducer,
      },
  });

export default store;
