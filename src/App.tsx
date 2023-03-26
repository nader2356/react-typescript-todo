
import { useColorMode } from "@chakra-ui/react";
import './App.css'
import { IconButton} from "@chakra-ui/react";



import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Main from "./components/Main";

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Main />
      <IconButton
        aria-label="toggle colormode"
        icon={colorMode === "light" ? <SunIcon height="100%" /> : <MoonIcon height="100%" />}
        position="absolute"
       
        top=".5rem"
        right=".5rem"
        p=".4rem"
        onClick={toggleColorMode}
        variant="ghost"
        />
    </>
  );
}

export default App
