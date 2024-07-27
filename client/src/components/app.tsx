import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../lib/apis/auth-api';
import { usePrefetchGW2Log } from '../lib/apis/gw2-api';
import './app.scss';
import DiscordLog from './discord-log/discord-log';
import EventPage from './events/event-page';
import Layout from './layout';
import Log from './log/log';
import LoginPage from './login-page';
import NotFound from './not-found';
import RecruitmentPage from './recruitment/recruitment-page';
import Roster from './roster/roster';

const App = () => {
  const { data: authInfo } = useAuth();

  usePrefetchGW2Log(!!authInfo && !!authInfo.loggedIn);

  return (
    <Box className="paper-container">
      {authInfo && authInfo.loggedIn && authInfo.isAdmin ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Layout}>
              <Route path="/" Component={Roster} />
              <Route path="/log" Component={Log} />
              <Route path="/discord-log" Component={DiscordLog} />
              <Route path="/events" Component={EventPage} />
              <Route path="/recruitment" Component={RecruitmentPage} />
              <Route path="*" Component={NotFound} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
};

export default App;
