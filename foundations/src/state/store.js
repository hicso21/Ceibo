import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import petsReducer from "./pets";
import userReducer from "./user";
import searchReducer from "./search";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(logger),
    reducer: {
      user: userReducer,
      pets: petsReducer,
      search:searchReducer,
      },
  });

export default store;

//perros@gmail.com
//123456