import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, useColorMode } from "@chakra-ui/react";
import './App.css'

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <div>app</div>
      <Button onClick={toggleColorMode}>toggle color mode</Button>
    </div>
  );
}

export default App
