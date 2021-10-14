import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "./components/Card";
import Userhome from "./components/Userhome";
import Usercard from "./components/Usercard";
import "./components/Usercard.css";



function App() {
  return (
    <div className="App">
     <Userhome/>
    <div>
       <Usercard/>
    </div>
    </div>
  
  );
}

export default App;
