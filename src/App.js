import Game from "./pages/Game";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="game/:id" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
