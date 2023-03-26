import { useState } from "react";

export enum EStatus {
  success = "success",
  error = "error",
}

interface IAlert {
    id: number;
  isVisible: boolean;
  title: string;
  description: string;
  status: EStatus;
}


type TNotifie = (arg0: string, arg1: string, arg2: EStatus) => void;
const TIMEOUT = 3000;

export const useAlert = () => {
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    const removeAlert = (id: number) => {
      setAlerts((prev) => prev.filter((item) => item.id !== id));
    };
    const notifie: TNotifie = (title, description, status) => {
    const id = Math.floor(Math.random() * 1000);

    setAlerts((prev) => [
        ...prev,
        {
          id,
          isVisible: true,
          title,
          description,
          status,
          timeout: setTimeout(() => {
            removeAlert(id);
          }, TIMEOUT),
        },
      ]);
  };

  return { alerts, removeAlert, notifie };
};