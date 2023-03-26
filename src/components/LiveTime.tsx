import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

const LiveTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text fontSize="md" mt="-0.5rem" color="gray.400">{currentTime}</Text>;
};

export default LiveTime;