import Row from "../Table/Row";
import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import { Fragment } from "react";
import MenuBar from "../Menubar/Menubar";
import Submitter from "../Submitter/Submitter";
import Filter from "../Filter/Filter";
function Visits() {

    //fetch table from backend, map each as seperate rows
    const [display, setDisplay] = useState("table");
    let keys = ["visit_id", "table_id", "customer_name", "waiter_name", "num_guest", "date", "time_start", "time_stop", "check_amount", "tips_amount", "total_amount"];

    //change null and false and true to string on fetch?
    let temp = [{   "visit_id": 1, 
                    "table_id": 49, 
                    "customer_name": "Charlie", 
                    "waiter_name": "Wilson", 
                    "num_guest": 8, 
                    "date": "2021-10-31", 
                    "time_start": "21:00:00", 
                    "time_stop": "22:30:00", 
                    "check_amount": 21.88, 
                    "tips_amount": 4.50,
                    "total_amount": 26.38}];

    return (
        <Fragment>
            <h1>Visits History</h1>
            <h2>Choose Action</h2>

            <Switcher setDisplay={setDisplay}>
            </Switcher >


            {display === "table" &&
                <Fragment>
                    <h2>Filter</h2>
                    <Filter keys={keys} url="testurl"></Filter>

                    <div className="flexTable">
                        <div className="visitCell cell header">Visit ID</div>
                        <div className="visitCell cell header" >Table #</div>
                        <div className="visitCell cell header" >Customer</div>
                        <div className="visitCell cell header" >Waiter</div>
                        <div className="visitCell cell header" ># Guests</div>
                        <div className="visitCell cell header" >Date</div>
                        <div className="visitCell cell header" >Start</div>
                        <div className="visitCell cell header" >End</div>
                        <div className="visitCell cell header" >Check</div>
                        <div className="visitCell cell header" >Tips</div>
                        <div className="visitCell cell header" >Total</div>
                        <div className="visitCell cell"></div>
                        <div className="visitCell cell"></div>
                        {temp.map((element, index) =>
                            <Row cellClass="visitCell" data={element} keys={keys}></Row>
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

export default Visits;
