import { Fragment, useState, useRef } from "react";
//Display One Row in Database Entity


function Row(props) {
  const textRef = useRef(props.data)
  const [display, setDisplay] = useState(true);
  const [edit, setEdit] = useState(false);

  function handleSubmit(event) {
    event.preventDefault()
    console.log(textRef.current)
    //we want to submit maybe another state
    setEdit(false)
  }


  function handleDelete(event) {
    alert("This will delete in final applicaiton")
    setDisplay(false)
  }

  function handleChange(event) {
    let key = event.target.id
    textRef.current[key] = event.target.value
  }
  if (display) {
    return (
      <Fragment>
        {edit && <Fragment>
          <form>
            {props.keys.map((key) =>
              <input type="text" id={key} className={`${props.cellClass} cell`} placeholder={props.data[key]} onChange={handleChange}></input>
            )}
            <button type="submit" className={`${props.cellClass} cell`} onClick={handleSubmit}>Submit</button>

          </form>
        </Fragment>}

        {!edit && <Fragment>
          {props.keys.map((key) =>
            <div id={key} className={`${props.cellClass} cell`}>{(props.data[key])}</div>
          )}
          <button className={props.cellClass} onClick={() => setEdit(true)}>Edit</button>
          <button className={props.cellClass} onClick={handleDelete}>Delete</button>

        </Fragment>}


      </Fragment>


    )

  }
  else {
    return null
  }











}
export default Row;
