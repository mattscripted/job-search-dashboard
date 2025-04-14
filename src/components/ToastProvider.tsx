"use client";

import { createContext, useContext, useState } from "react";
import {
  Toast as BaseToast,
  ToastToggle as BaseToastToggle
} from "flowbite-react";

type ToastState = {
  message: string;
}

type ToastContextType = {
  setToast: (toastState: ToastState) => void;
}

// We use undefined for outside of the <ToastProvider>
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastState, setToastState] = useState<ToastState | null>(null);

  const setToast = (toastState: ToastState) => {
    setToastState(toastState);

    // Clear toast after a few seconds
    setTimeout(() => setToastState(null), 3000);
  };

  return (
    <ToastContext value={{ setToast }}>
      {children}
      {toastState && (
        <BaseToast className="fixed top-4 right-4">
          <div className="ml-3 text-sm font-normal">{toastState.message}</div>
          <BaseToastToggle />
        </BaseToast>
      )}
    </ToastContext>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
