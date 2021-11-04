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
    let keys = ["tableid", "num_seat", "features"]
    //change null and false and true to string on fetch?
    let temp = [{ "tableid": 1, "num_seat": 8, "features": "flexible box" }]
    return (

        <Fragment>
            <MenuBar />
            <h1>Visits History</h1>
            <h2>Choose Action</h2>

            <Switcher setDisplay={setDisplay}>
            </Switcher >


            {display === "table" &&
                <Fragment>
                    <h2>Filter</h2>
                    <Filter keys={keys} url="testurl"></Filter>

                    <div className="flexTable">
                        <div className="diningCell cell header">Table ID</div>
                        <div className="diningCell cell header" >Number of Seats</div>
                        <div className="diningCell cell header" >Features</div>
                        <div className="diningCell cell"></div>
                        <div className="diningCell cell"></div>
                        {temp.map((element, index) =>
                            <Row cellClass="diningCell" data={element} keys={keys}></Row>
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
