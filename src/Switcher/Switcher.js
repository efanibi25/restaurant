import { Fragment } from "react";
//This Component Switches to Differnet Database Actions
function Switcher(props) {
  function handleSelect(event) {
    let selection = event.target.value
    console.log(selection)
    props.setDisplay(selection)
  }

  return (
    <Fragment>
      <select name="Database" id="options" onChange={handleSelect}>
        <option value="table">Show Table</option>
        <option value="insert">Insert Element</option>
      </select>
    </Fragment>

  );
}

export default Switcher;
