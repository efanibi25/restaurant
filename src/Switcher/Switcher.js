import { Fragment } from "react";
//This Component Switches to Differnet Database Actions
function Switcher(props) {
  function handleSelect(event){
    let selection=event.target.value
    console.log(selection)
    props.setDisplay(selection)
  }

    return (
        <Fragment>
<select name="Database" id="cars" onChange={handleSelect}>
  <option value="Table">Table</option>
  <option value="Insert">Insert</option>
  <option value="Delete">Delete</option>
  <option value="Update">Update</option>
</select>



        </Fragment>

    );
  }
  
  export default Switcher;
  