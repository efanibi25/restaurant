import Row from "../Table/Row";
import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import { Fragment } from "react";
function Waiters() {
    //fetch table from backend, map each as seperate rows
    const [display, setDisplay] = useState("Table");
    return(

<Fragment>
<h1>Manage Waiters</h1>
<h2>Choose Action</h2>
<Switcher setDisplay={setDisplay}>
</Switcher >
{display==="Table" &&
        <table>
        <thead > 
        <tr style={{padding:"10px"}}>
        <th>Customer ID</th>
        <th>Number of Seats</th>
        <th>Reserved Time</th>
        <th>Special Request</th> 
        </tr>
      
        </thead>
        <tbody >
        <Row>
        </Row>
        </tbody>
 
        </table>
       
    
    }
     
</Fragment>
    
    )
    
  }
  
  export default Waiters;
  