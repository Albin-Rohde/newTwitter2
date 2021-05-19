import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignIn from './auths/sign-in';
import SignUp from './auths/signUp';
import Dashboard from './dashboard/dashboard';

function App() {
  const [yes, setYes] = useState(false)
  console.log(yes)
  if(yes === true) {
    localStorage.setItem('yes', 'true')
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('yes')
    if(isLoggedIn === 'true') {
      return setYes(true)
    }
    setYes(false)
  }, [])
  return (
    <div className="App">
      <Switch>
      <Route
          exact
          path="/sign-in"
          render={props =>
            yes === false ? (
              <SignIn setYes={setYes} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
      <Route
          exact
          path="/sign-up"
          render={props =>
            yes === false ? (
              <SignUp setYes={setYes} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={props =>
            yes === true ? (
              <Dashboard />
            ) : (
              <Redirect to="/sign-up" />
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;
