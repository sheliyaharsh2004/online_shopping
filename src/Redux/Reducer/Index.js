import { combineReducers } from "redux";
import { Counterreducer } from "./Counter.reducer";
import { doctorReducer } from "./doctor.reducrr";

export const rootreducer = combineReducers({
    counter : Counterreducer,
    doctor : doctorReducer
  })