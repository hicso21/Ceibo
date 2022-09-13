import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import petsReducer from "./pets";
import userReducer from "./user";
import idReducer from './id'
import searchReducer from "./search";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      user: userReducer,
      pets: petsReducer,
      id: idReducer,
      search:searchReducer,
      },
  });

export default store;

//perros@gmail.com
//123456