import { Route, Routes } from "react-router-dom";
import Paper from "./layouts/Paper";
import Game from "./pages/Game";
import Intro from "./pages/Intro";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="container mx-auto max-w-2xl">
      <Paper>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Paper>
    </div>
  );
}

export default App;
