import React from "react";
import {  TextField } from "@mui/material";

function NumericField(props) {
   
    let{onKeyPress,onChange,onInput,max,min,...others}=props

    onKeyPress=onKeyPress||function(){}
    onChange=onChange||function(){}
    onInput=onInput||function(){}
    max=max||Number.MAX_SAFE_INTEGER 
    min=min||0
    //handle inproper values 
    const handleKeyPress = (event) => {
        console.log(event.which)
        if (event.which != 8 && event.which != 13 && event.which != 0 && !(event.which >= 48 && event.which <= 57)) {
            event.preventDefault()
            alert("Invalid input:Please Enter A number")
        }
    };

    const handleInput = (event) => {
        let value = parseInt(event.target.value)
        if (value !== value) {
            return
        }
        if (value < min) {
            alert(`Out of Range:${min}-${max}`)
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
        <TextField type="number" inputProps={{ onKeyPress: handleKeyPress, onInput: handleInput }} onChange={onChange} max={max} min={min} {...others}></TextField>
    );
}

export default NumericField;