import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./componenets/Footer";
import Paper from "./layouts/Paper";
import NotFound from "./pages/NotFound";

const Game = lazy(() => import("./pages/Game"));
const Intro = lazy(() => import("./pages/Intro"));
const Stats = lazy(() => import("./pages/Stats"));

function App() {
  return (
    <div className="container mx-auto max-w-2xl">
      <Paper>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="game" element={<Game />} />
            <Route path="stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Paper>
      <Footer />
    </div>
  );
}

export default App;
