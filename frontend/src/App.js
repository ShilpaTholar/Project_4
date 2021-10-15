import './App.css';
import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Switch, Route, BrowserRouter as Router, useHistory } from "react-router-dom";
import { reducer, initialState } from './reducers/userReducer'
import UserLogin from './components/user/userLogin';
import UserHome from './components/user/userHome';
import ShopLogin from './components/shop/shopLogin';
import UserSignup from './components/user/userSignup';

export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });   //As when user closes the application the state is also destroyed so to give acess to protected data we update the state.
    } else {
      history.push('/userlogin');
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/userLogin" component={UserLogin}></Route>
        <Route exact path="/userHome" component={UserHome}></Route>
        <Route exact path="/shopLogin" component={ShopLogin}></Route>
        <Route exact path="/userSignup" component={UserSignup}></Route>
      </Switch>
    </Router>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
