import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import GameLayout from './GameLayout/GameLayout';

import MoreLess from '../pages/MoreLess';
import Home from '../pages/Home';
import About from '../pages/About';
import TikTakToe from '../pages/TikTakToe';
import StoneCutPaper from '../pages/StoneCutPaper';
import Snake from '../pages/Snake';
import GuessTheNumber from '../pages/GuessTheNumber';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="games" element={<GameLayout />}>
            <Route path="more-less" element={<MoreLess />} />
            <Route path="tik-tak-toe" element={<TikTakToe />} />
            <Route path="stone-cut-paper" element={<StoneCutPaper />} />
            <Route path="snake" element={<Snake />} />
            <Route path="guess-the-number" element={<GuessTheNumber />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
