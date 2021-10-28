
//get filter, then redirect to url with parameters
//Should probably be a pop up

import { Fragment } from "react";
import { useHistory } from "react-router";
function Filter(props) {
    const hist=useHistory()
    function handleSubmit(){
        // history.push("")
        console.log("push history")
    }
return(
<Fragment>
<form>
{props.keys.filter(key=>key.match(/id/)===null).map((key)=>
<input placeholder={key} type="text" id={key}></input>
)}
<button type="submit" onSubmit={handleSubmit}>submit</button>

</form>


</Fragment>
    
    )
    
  }
  
  export default Filter;
  