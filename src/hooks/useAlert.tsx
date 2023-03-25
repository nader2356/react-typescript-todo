import { useState } from "react";

interface state {
  isVisible: boolean;
  title: string;
  description: string;
  status: "success" | "error";
}

const initialState: state = {
  isVisible: false,
  title: "",
  description: "",
  status: "success",
};

export const useAlert = () => {
  const [state, setState] = useState<state>(initialState);

  const notifie = (
    title: string,
    description: string,
    status: "success" | "error"
  ) => {
    setState({
      isVisible: true,
      title,
      description,
      status,
    });

    setTimeout(() => setState(initialState), 3000);
  };

  return { state, notifie };
};