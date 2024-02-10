import { useEffect } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/header/header";
function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);
  return (
    <div className="App">
      <Header/>
      <button obClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
