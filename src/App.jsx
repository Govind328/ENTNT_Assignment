import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { initializeLocalStorage } from "./utils/initLocalStorage";

function App() {
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return <AppRouter />;
}

export default App;
