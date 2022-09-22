import { combineReducers } from "redux";
import { Cartreducer } from "./Cart.reducer";
import { Counterreducer } from "./Counter.reducer";
import { doctorReducer } from "./doctor.reducrr";
import { productReducer } from "./product.reducer";

export const rootreducer = combineReducers({
    counter : Counterreducer,
    doctor : doctorReducer,
    product : productReducer,
    cart : Cartreducer
  })