import React from "react";
import { TextField } from "@mui/material";

function PhoneField(props) {
  const {...others}=props



  //handle inproper values 
  const handleKeyPress = (event) => {
    if (event.target.value.length == 3 || event.target.value.length == 7) {
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





  return (
    <TextField type="tel" inputProps={{ onKeyPress: handleKeyPress, maxLength: 12 } }{...others}></TextField>
  );
}

export default PhoneField;