"use client";

import { Slide, ToastContainer } from "react-toastify";
import { Check, CircleAlert, Info, TriangleAlert } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider() {
  return (
    <ToastContainer
      theme="dark"
      autoClose={3000}
      closeOnClick
      hideProgressBar
      position="bottom-right"
      transition={Slide}
      icon={({ type }) => {
        switch (type) {
          case "info":
            return <Info className="stroke-indigo-400" />;
          case "error":
            return <CircleAlert className="stroke-red-500" />;
          case "success":
            return <Check className="stroke-green-500" />;
          case "warning":
            return <TriangleAlert className="stroke-yellow-500" />;
          default:
            return null;
        }
      }}
    />
  );
}
