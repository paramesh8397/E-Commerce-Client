"use client";
import { store } from "@/lib/store";
import React, { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import Header from "./Header";

const Providerwrap = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
};

export default Providerwrap;
