import React from "react";
import { getDialogActionsUtilityClass, TextField } from "@mui/material";

function NumericField(props) {
    const{
    onChange,
    onKeyPress,
    max=Number.MAX_SAFE_INTEGER,
    min=0,
    onInput
    }=props
  console.log(min)
    
    // let onKeyPress=props.onKeypress||function(){}
    // let onInput=props.onInput||function(){}
    // let max=props.max||Number.MAX_SAFE_INTEGER 
    // let min=props.min||0
    //handle inproper values 
    const handleKeyPress= (event) => {
    console.log(event.which)
    if(event.which != 8 && event.which != 13 && event.which != 0 && !(event.which >= 48 && event.which <= 57)){
    event.preventDefault()
    alert("Invalid input")
    }
      };

      const handleInput= (event) => {
        let value=parseInt(event.target.value)
        if (value!==value){
            return
        }
        if(value<min){
        alert("Out of Range")
        event.target.value=min
        return
        }

        if(value>max){
            alert("Out of Range")
            event.target.value=max
            return
            }
          };
      
      
      

    return (
<TextField type="number" inputProps={{ onKeyPress: handleKeyPress,onInput:handleInput }} onChange={onChange} max={max} min={min}></TextField>
    );
}

export default NumericField;
