import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import {ScoreProvider} from "./context/scoringContext";
import Splash from "./pages/splash";
import ScoreReport from "./pages/scoreReport";
import Preview from "./pages/previewRubric";
import Landing from "./pages/landing";
import ProjectEntry from "./pages/projectEntry";
import OpenaiIntegrationTesting from "./pages/openaiIntegrationTesting";
import TeacherHome from "./pages/teacherHome";
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ScoreProvider>
              <Routes>
                <Route path='/score23/:projectNumber'  element={<Home />} />
                <Route path='/' exact element={<Splash />}/>
                <Route path='/preview' element={<Preview />}/>
                <Route path='/report23/' element={<ScoreReport />}/>
                <Route path='/judgemps23/' element={<Landing />}/>
                <Route path='/pe' element={<ProjectEntry />}/>
                <Route path='/ai' element={<OpenaiIntegrationTesting />}/>
                <Route path='/teacher' element={<TeacherHome />} />
              </Routes>
          </ScoreProvider>
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App);
