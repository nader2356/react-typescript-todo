import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, useColorMode } from "@chakra-ui/react";
import './App.css'
import Main from "./components/Main";

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Main />
      <Button
        position="absolute"
        bottom=".5rem"
        right=".5rem"
        onClick={toggleColorMode}
      >
        toggle color mode
      </Button>
    </>
  );
}

export default App
