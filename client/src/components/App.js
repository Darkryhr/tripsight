import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';

import Sidebar from './SideBar';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Landing from './Landing';
import './App.css';
import * as actions from '../actions';
import AdminDashboard from './AdminDashboard';
import Graph from './Graph';
import NotFound from './NotFound';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, []);
  const ProtectedRoute = ({ auth, ...rest }) => {
    if (!auth.isAuthenticated) return <Landing {...rest} />;
    else if (auth.isAuthenticated) {
      if (auth.isAdmin === 1) return <AdminDashboard {...rest} />;
      else return <Dashboard {...rest} />;
    }
  };

  return (
    <div className="app__body">
      <Router>
        <Sidebar />
        <Switch>
          <ProtectedRoute path="/" exact auth={auth} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/graph" component={Graph} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
      <div className="app__footer">
        <h5>Rights Reserved</h5>
        <div className="app__footerSocial">
          <LinkedInIcon />
          <GitHubIcon />
          <InstagramIcon />
        </div>
      </div>
    </div>
  );
}

export default App;
