import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import {ScoreProvider} from "./context/scoringContext";
import Splash from "./pages/splash";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ScoreProvider>
              <Routes>
                <Route path='/score/:projectID'  element={<Home />} />
                  <Route path='/splash/' exact element={<Splash />}/>
              </Routes>
          </ScoreProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
