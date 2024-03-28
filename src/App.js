import './App.css';
import '@aws-amplify/ui-react/styles.css';
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
import {UserContextProvider} from "./context/userContext";
import JudgeHome from "./pages/judgeHome";
import ScoreLookup from "./pages/scoreLookup";
import WinnerReports from "./pages/winnerReports";
import CheckIn from "./pages/checkIn";
import Schedule from "./pages/schedule";
import TeacherTaskList from "./pages/teacherTaskList";

Amplify.configure(awsconfig)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <UserContextProvider>
          <ScoreProvider>
              <Routes>
                  <Route path='/' exact element={<Splash />}/>
                  <Route path='/preview' element={<Preview />}/>
                  <Route path='/report24/' element={<ScoreReport />}/>
                  <Route path='/judgeHome/:email' element={<JudgeHome />}/>
                  <Route path='/teacher' element={<TeacherHome />} />
                  <Route path='/scoreLookup/:projectNumber' element={<ScoreLookup />} />
                  <Route path='/slides' element={<WinnerReports />} />
                  <Route path='/checkin24jnp' element={<CheckIn />} />
                  <Route path='/schedule' element={<Schedule />} />
                  <Route path='teacherTaskList/:email' element={<TeacherTaskList />} />
              </Routes>
          </ScoreProvider>
          </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;