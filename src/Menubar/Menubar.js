import Row from "../Table/Row";
import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import { Fragment } from "react";
function MenuBar() {
    //fetch table from backend, map each as seperate rows
    const [display, setDisplay] = useState("Table");
    return(

<Fragment>
<a href={"/"}>Home Page</a>
<a href={"/tables"}>Dining Tables</a>
<a href={"/customers"}>Customers</a>
<a href={"/waitlist"}>Waitlist</a>
<a href={"/waiters"}>Waiters</a>
<a href={"/visits"}>Visits</a>

</Fragment>
    
    )
    
  }
  
  export default MenuBar;
  