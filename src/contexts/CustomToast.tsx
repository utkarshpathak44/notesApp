import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts([...toasts, { id, message }]);
    setTimeout(() => removeToast(id), 1000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed bottom-0 left-0 w-83 z-50 bg-amber-800">
        {toasts.map((toast,index) => (
          <div key={toast.id} className={`p-2 px-4 gap-2 flex flex-row bottom-{index*20} item-center text-white font-semibold`}>
            <img src="./src/assets/completed.svg" alt="" />
            <div>{toast.message}</div>
            
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
