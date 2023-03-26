import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
  } from "@chakra-ui/react";
  import { IAlert } from "../hooks/useAlert";
  import { motion } from "framer-motion";
  
  interface Props {
    alert: IAlert;
    removeAlert: (arg0: number) => void;
  }
  
  const AlertItem = ({ alert, removeAlert }: Props) => {
    return (
      <Alert
        status={alert.status}
        as={motion.div}
        layout
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <AlertIcon />
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertDescription>{alert.description}</AlertDescription>
        <CloseButton ml="auto" onClick={() => removeAlert(alert.id)} />
      </Alert>
    );
  };
  
  export default AlertItem;