import Row from "../Table/Row";
import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import { Fragment } from "react";
import Submitter from "../Submitter/Submitter";
import Filter from "../Filter/Filter";
function Customers() {
    //fetch table from backend, map each as seperate rows
    const [display, setDisplay] = useState("table");
    let keys = ["customerid", "name", "phone"]
    //change null and false and true to string on fetch?
    let temp = [{ "customerid": 1, "name": "johhny customer", "phone": "888-888-8888" }]
    return (

        <Fragment>
            <h1>Manage Customers</h1>
            <h2>Choose Action</h2>

            <Switcher setDisplay={setDisplay}>
            </Switcher >

            {display === "table" &&
                <Fragment>
                    <h2>Filter</h2>
                    <Filter keys={keys} url="testurl"></Filter>
                    <div className="flexTable">
                        <div className="customerCell cell header">Customer ID</div>
                        <div className="customerCell cell header" >Customer name</div>
                        <div className="customerCell cell header" >Customer Phone</div>
                        <div className="customerCell cell"></div>
                        <div className="customerCell cell"></div>
                        {temp.map((element, index) =>
                            <Row cellClass="customerCell" data={element} keys={keys}></Row>
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

export default Customers;
