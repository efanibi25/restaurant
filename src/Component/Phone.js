import React from "react";
import { getDialogActionsUtilityClass, TextField } from "@mui/material";

function PhoneField(props) {


  // let onKeyPress=props.onKeypress||function(){}
  // let onInput=props.onInput||function(){}
  let max=props.max||Number.MAX_SAFE_INTEGER 
  let min=props.min||0
  let onChange=props.onChange||function(){}

  //handle inproper values 
  const handleKeyPress = (event) => {
    if (event.target.value.length == 3 || event.target.value.length == 9) {
      if (event.which != 45) {
        event.preventDefault()
        alert("Invalid input:Format 789-789-7777")
      }
    }
    else {

      if (event.which != 8 && event.which != 13 && event.which != 0 && !(event.which >= 48 && event.which <= 57)) {
        event.preventDefault()
        alert("Invalid input:Format 789-789-7777")
      }
    }



  };

  const handleInput = (event) => {
    let value = parseInt(event.target.value)
    if (value !== value) {
      return
    }
    if (value < min) {
      alert("Out of Range")
      event.target.value = min
      return
    }

    if (value > max) {
      alert("Out of Range")
      event.target.value = max
      return
    }
  };




  return (
    <TextField type="tel" inputProps={{ onKeyPress: handleKeyPress, onInput: handleInput, maxLength: 12 }} onChange={onChange}></TextField>
  );
}

export default PhoneField;
