import Row from "../Table/Row";
import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import { Fragment } from "react";
import MenuBar from "../Menubar/Menubar";
import Submitter from "../Submitter/Submitter";
import Filter from "../Filter/Filter";
function Waitlist() {
    //fetch table from backend, map each as seperate rows
    const [display, setDisplay] = useState("table");
    let keys = ["queueid", "customerid", "numberseat", "time", "request", "seated"]
    //change null and false and true to string on fetch?
    let temp = [{ "queueid": 1, "customerid": 1, "numberseat": 8, "time": "8:30pm", "request": "null", "seated": "false" }]
    console.log(temp)
    return (

        <Fragment>
            <h1>Manage Waitlist</h1>
            <h2>Choose Action</h2>

            <Switcher setDisplay={setDisplay}>
            </Switcher >




            {display === "table" &&
                <Fragment>
                    <h2>Filter</h2>
                    <Filter keys={keys} url="testurl"></Filter>
                    <div className="flexTable">
                        <div className="waitCell cell header">Queue ID</div>
                        <div className="waitCell cell header">Customer ID</div>
                        <div className="waitCell cell header" >Number of Seats</div>
                        <div className="waitCell cell header" >Reserved Time</div>
                        <div className="waitCell cell header">Special Requests</div>
                        <div className="waitCell cell header">Guest Seated?</div>

                        <div className="waitCell cell"></div>
                        <div className="waitCell cell"></div>
                        {temp.map((element, index) =>
                            <Row cellClass="waitCell" data={element} keys={keys}></Row>
                        )}

                    </div>
                </Fragment>

            }

            {display != "table" &&

                <Submitter keys={keys} url="testurl"></Submitter>

            }

        </Fragment>

    )

}

export default Waitlist;
