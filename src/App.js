import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Waitlist from "./Pages/Waitlist";


function App() {
  return (
    <Router>
    <Switch>
          <Route path="/waitlist">
            <Waitlist />
          </Route>
         
        </Switch>
          </Router>
  );
}

export default App;
