import './style.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Waitlist from "./Pages/Waitlist";
import Customer from './Pages/Customers';
import DiningTables from './Pages/DiningTables';
import Waiters from './Pages/Waiters';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
    <Switch>
       <Route exact path="/">
         <Home/>
         </Route>
          <Route path="/waitlist">
            <Waitlist />
          </Route>

          <Route path="/customers">
            <Customer/>
          </Route>
          <Route path="/tables">
            <DiningTables />
          </Route>


          <Route path="/waiters">
            <Waiters />
          </Route>
         
         
        </Switch>
          </Router>
  );
}

export default App;
