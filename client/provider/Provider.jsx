"use client";

import { NextUIProvider  } from "@nextui-org/react";
import { ContextProvider } from "./ContextProvider";


export function Provider({ children }) {
  return (
    <ContextProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ContextProvider>
  );
}