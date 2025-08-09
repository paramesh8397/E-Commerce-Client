import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CartReducer from "./cartslice";

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;

export { store };
