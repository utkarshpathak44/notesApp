import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]); // Typed the toasts array as Toast[]

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message }]);
    setTimeout(() => removeToast(id), 1000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 left-0 w-83 z-10 bg-amber-800">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className={`p-2 px-4 gap-2 flex flex-row bottom-${index * 20} item-center text-white font-semibold`}
          >
            <img src="./src/assets/completed.svg" alt="" />
            <div>{toast.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("error");
  }
  return context.showToast;
};
