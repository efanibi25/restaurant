import Row from "../Table/Row";
import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import { Fragment } from "react";
import MenuBar from "../Menubar/Menubar";
import Submitter from "../Submitter/Submitter";

function Waiters() {
    //fetch table from backend, map each as seperate rows
    const [display, setDisplay] = useState("Table");
    let temp = [{ "waiterid": 1, "name": "john" }]
    let keys = ["waiterid", "name"]
    return (

        <Fragment>
            <MenuBar />
            <h1>Manage Waiters</h1>
            <h2>Choose Action</h2>

            <Switcher setDisplay={setDisplay}>
            </Switcher >

            {display === "Table" &&
                <div className="flexTable">
                    <div className="waiterCell cell header">Waiter ID</div>
                    <div className="waiterCell cell header">Waiter Name</div>
                    <div className="waiterCell cell"></div>
                    <div className="waiterCell cell"></div>
                    {temp.map((element, index) =>
                        <Row cellClass="waiterCell" data={element} keys={keys}></Row>
                    )}

                </div>


            }
            {display != "table" &&

                <Submitter keys={keys} url="testurl"></Submitter>

            }

        </Fragment>

    )

}

export default Waiters;
