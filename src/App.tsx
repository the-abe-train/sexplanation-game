import { Route, Routes } from "react-router-dom";
import Footer from "./componenets/Footer";
import Paper from "./layouts/Paper";
import Game from "./pages/Game";
import Intro from "./pages/Intro";
import NotFound from "./pages/NotFound";
import Stats from "./pages/Stats";

function App() {
  return (
    <div className="container mx-auto max-w-2xl">
      <Paper>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="game" element={<Game />} />
          <Route path="stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Paper>
      <Footer />
    </div>
  );
}

export default App;
