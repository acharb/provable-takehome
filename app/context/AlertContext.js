"use client";

import { createContext, useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import { X, CircleX, TriangleAlert } from "lucide-react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "error",
    visible: false,
  });

  const showAlert = ({ title, message, type = "error" }) => {
    setAlert({
      title: title || (type === "error" ? "Error" : "Warning"),
      message,
      type,
      visible: true,
    });

    // Auto-hide after 6 seconds
    setTimeout(() => {
      setAlert({
        title,
        message,
        type,
        visible: false,
      });
    }, 6000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert alert={alert} setAlert={setAlert} />
    </AlertContext.Provider>
  );
};

// Custom Hook for using Context
export const useAlert = () => useContext(AlertContext);

// Alert Component
const Alert = ({ alert, setAlert }) => {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex px-4 py-6 items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={alert.visible}>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-800 shadow-lg ring-1 ring-gray-700/50 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    {alert.type === "error" ? (
                      <CircleX
                        aria-hidden="true"
                        className="size-6 text-red-500"
                      />
                    ) : (
                      <TriangleAlert
                        aria-hidden="true"
                        className="size-6 text-amber-500"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={`text-sm font-medium text-gray-100`}>
                      {alert.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      {alert.message}
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setAlert({
                          ...alert,
                          visible: false,
                        });
                      }}
                      className="inline-flex rounded-md bg-gray-700 text-gray-300 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">Close</span>
                      <X aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
