import './App.css';
import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Switch, Route, BrowserRouter as Router, useHistory } from "react-router-dom";
import { reducer, initialState } from './reducers/userReducer';
import UserLogin from './components/user/userLogin';
import UserHome from './components/user/userHome';
import Userprofile from './components/user/Userprofile';
import Wishlist from './components/user/Wishlist';
import DisplayIndividualProduct from './components/user/DisplayIndividualProduct';
import ShopUpdate from './components/shop/shopUpdate';
import UserSignup from './components/user/userSignup';
import ShopCreate from './components/shop/shopCreate';
import ShopEdit from './components/shop/shopEdit';
import Cart from './components/user/Cart';
import Afterwishlist from './components/user/Afterwishlist';
import Aftercart from './components/user/Aftercart';
import Cart from './components/user/Cart';
import Checkout from './components/user/Checkout';

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
    <Router history={history}>
      <Switch>
        <Route exact path="/userLogin" component={UserLogin}></Route>
        <Route exact path="/userSignup" component={UserSignup}></Route>
        <Route exact path="/userHome" component={UserHome}></Route>
        <Route exact path="/DisplayProduct/:id" component={DisplayIndividualProduct}></Route>
        <Route exact path="/wishlist" component={Wishlist}></Route>
        <Route exact path="/Landingpage" component={Landingpage}></Route>
        <Route exact path="/userProfile" component={Userprofile}></Route>
        <Route exact path="/DisplayProduct/:id" component={DisplayIndividualProduct}></Route>
        <Route exact path="/wishlist" component={Wishlist}></Route>
        <Route exact path="/Afterwishlist/:id/:id1" component={Afterwishlist}></Route>
        <Route exact path="/Aftercart/:id/:id1" component={Aftercart}></Route>
        <Route exact path="/shopUpdate" component={ShopUpdate}></Route>
        <Route exact path="/shopCreate" component={ShopCreate}></Route>
        <Route exact path="/shopEdit/:id" component={ShopEdit}></Route>
        <Route exact path="/Cart" component={Cart}></Route>
        <Route exact path="/Checkout" component={Checkout}></Route>
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
