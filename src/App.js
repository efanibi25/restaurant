import './style.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Waitlist from "./Pages/Waitlist";
import Customers from './Pages/Customers';
import DiningTables from './Pages/DiningTables';
import Waiters from './Pages/Waiters';
import Visits from './Pages/Visits';
import Home from './Pages/Home';
import Menubar from './Component/Menubar';

function App() {
  return (
    <Router>
      <Menubar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/waitlist" component={Waitlist} />
        <Route path="/customers" component={Customers} />
        <Route path="/diningtables" component={DiningTables} />
        <Route path="/waiters" component={Waiters} />
        <Route path="/visits" component={Visits} />
      </Switch>
    </Router>
  );
}

// function App() {
//   return (
//     <Router>
//       <Switch>
//        <Route exact path="/">
//          <Home/>
//          </Route>
//           <Route path="/waitlist">
//             <Waitlist />
//           </Route>
//           <Route path="/tables">
//             <DiningTables />
//           </Route>
//           <Route path="/customers">
//             <Customers/>
//           </Route>
//           <Route path="/waiters">
//             <Waiters />
//           </Route>
//           <Route path="/visits">
//             <Visits />
//           </Route> 
//       </Switch>
//     </Router>
//   );
// }

export default App;
