import './App.css';
import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Switch, Route, BrowserRouter as Router, useHistory } from "react-router-dom";
import { reducer, initialState } from './reducers/userReducer'
import UserLogin from './components/user/userLogin';
import UserHome from './components/user/userHome';
import ShopUpdate from './components/shop/shopUpdate';
import UserSignup from './components/user/userSignup';
import ShopCreate from './components/shop/shopCreate';
import ShopEdit from './components/shop/shopEdit';
export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  console.log("state is = ", state)


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
        <Route exact path="/userSignup" component={UserSignup}></Route>
        <Route exact path="/shopUpdate" component={ShopUpdate}></Route>
        <Route exact path="/shopCreate" component={ShopCreate}></Route>
        <Route exact path="/shopEdit/:id" component={ShopEdit}></Route>
      </Switch>
    </Router>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log('state in app = ', state)
  console.log('state in app dispatch= ', dispatch)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
