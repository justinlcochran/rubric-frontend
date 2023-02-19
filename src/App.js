import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import {ScoreProvider} from "./context/scoringContext";
import Splash from "./pages/splash";
import ScoreReport from "./pages/scoreReport";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ScoreProvider>
              <Routes>
                <Route path='/score/:projectNumber'  element={<Home />} />
                <Route path='/splash/' exact element={<Splash />}/>
                <Route path='/report/' element={<ScoreReport />}/>
              </Routes>
          </ScoreProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
