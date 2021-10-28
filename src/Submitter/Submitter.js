import Row from "../Table/Row";
import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import { Fragment } from "react";
function Submitter(props) {
    //fetch table from backend, map each as seperate rows
    const [display, setDisplay] = useState("Table"); 
    return(

<Fragment>
<form action={props.url}>
{props.keys.map((key)=>

<input placeholder={key} type="text" id={key}></input>

)}
<button type="submit">submit</button>

</form>


</Fragment>
    
    )
    
  }
  
  export default Submitter;
  