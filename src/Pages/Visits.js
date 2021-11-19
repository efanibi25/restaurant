
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { TextField } from "@mui/material";
import NumericField from "../Component/Numeric";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TimePicker from '@mui/lab/TimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import  { createData as createCustomersNames  }  from "./Customers" ;
import  { createData as createWaitersNames }  from "./Waiters" ;


import {customerData,waiterData, visitsData} from "../DatabaseTest";
import { DatePicker } from "@mui/lab";
import { setDate } from "date-fns";
function createData(tableID,customerName,waiterName,numGuest,date,timeStart,timeStop,checkAmount,tipsAmount,totalAmount) {
    timeStart=new Date(timeStart).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
    timeStop=new Date(timeStop).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
    return {
    tableID,
    waiterName,
    customerName,
    numGuest,
    date,
    timeStart,
    timeStop,
    checkAmount,
    tipsAmount,
    totalAmount
  };
}





function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  {
    id: "tableID",
    numeric: true,
    disablePadding: true,
    label: "Table Number"
  },
  {
    id: "customerName",
    numeric: false,
    disablePadding: false,
    label: "Customer Name"
  },
  {
    id: "waiterName",
    numeric: false,
    disablePadding: false,
    label: "Waiter Name"
  },
  {
    id: "numGuest",
    numeric: true,
    disablePadding: false,
    label: "Number of Guest"
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date"
  },
  {
    id: "timeStart",
    numeric: true,
    disablePadding: false,
    label: "Start Time"
  },
  {
    id: "timeEnd",
    numeric: true,
    disablePadding: false,
    label: "End Time"
  },
  {
    id: "checkAmount",
    numeric: true,
    disablePadding: false,
    label: "Check Amount"
  },

  {
    id: "tipsAmount",
    numeric: true,
    disablePadding: false,
    label: "Tips Amount"
  },
  {
    id: "totalAmount",
    numeric: true,
    disablePadding: false,
    label: "Total Amount"
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts"
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;
  const { selected } = props;
  const { rows} = props;
  const { setRows } = props;
  const { setSelected } = props;
  const handleDelete = (event) => {
    let filter=rows.filter((curr)=>{
      if(!selected.includes(curr.queueID)){
        return true
      }
    }
    )
    setRows(filter)
    setSelected([])
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h1 className="pageTitle">Visits</h1>
        </Typography>
      )}

      {numSelected > 0 ? (
        <div>
          {numSelected==1 &&<Tooltip title="Edit">
            <IconButton>
            <EditIcon />
            </IconButton>
          </Tooltip>}
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function DiningTables() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [items, setItems] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const [customersNames, setCustomersNames] = React.useState([]);
  const [waitersNames, setWaitersNames] = React.useState([]);
  const [UTCStart, setUTCStart] = React.useState(new Date());
  const [UTCEnd, setUTCEnd] = React.useState(new Date());
  const [UTCDate, setUTCDate] = React.useState(new Date());

  //insert values
  const [numGuest, setNumGuest] = React.useState(0);
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [customerID, setCustomerID] = React.useState([]);
  const [waiterID, setWaiterID] = React.useState([]);
  const [check, setCheck] = React.useState(0);
  const [tips, setTips] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [date, setDate] = React.useState(0);




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.queueID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const getItems = (event) => {
    return stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  };

  const convertUTC= (date) => {
    if(date.getUTCMinutes()<10){
      return  `${date.getUTCHours()}:0${date.getUTCMinutes()}`  
    }
    return  `${date.getUTCHours()}:${date.getUTCMinutes()}`  
   };

  const handleCustomers= (event,newValue) => {
   setCustomerID(newValue.id)
  };


  const handleWaiters= (event,newValue) => {
    setWaiterID(newValue.id)
   };


   const handleStartTime= (newValue) => {
    setUTCStart(newValue)
   };

   const handleEndTime= (newValue) => {
    setUTCEnd(newValue)
   };


   const handleNumGuest= (event) => {
    setNumGuest(event.target.value)
   };





   const handleSubmit= (event) => {
    console.log(customerID,date,waiterID,numGuest,startTime,endTime,check,tips,total)
   };

   const handleDate= (newValue) => {
    console.log(newValue)
   };
   const handleCheck= (event) => {
    setCheck(event.target.value)
   };

   const handleTips= (event) => {
    setTips(event.target.value)
   };

   const handleTotal= (event) => {
    setTotal(event.target.value)
   };
 

  const isSelected = (name) => selected.indexOf(name) !== -1;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    React.useEffect(() => {
      setRows(
        visitsData.map((item,index)=>{
          return createData(...item)
  
         })
      )

      setCustomersNames(customerData.map((item,index)=>{
      return createCustomersNames(...item)
      }  
      
      ))


      setWaitersNames(waiterData.map((item,index)=>{
        return createWaitersNames(...item)
        }
        
        ))
    

    },[]);

    React.useEffect(() => {
      setItems(getItems())
    },[rowsPerPage]);

    React.useEffect(() => {
      setItems(getItems())
    },[rows]);
    
    React.useEffect(() => {
      setItems(getItems())
    },[page]);

    React.useEffect(() => {
      setStartTime(UTCStart.getTime())
    },[UTCStart]);

    React.useEffect(() => {
        setEndTime(UTCEnd.getTime())
      },[UTCEnd]);

 

    React.useEffect(() => {
        setDate(UTCDate.toLocaleDateString('en-US'))
      },[UTCDate]);


  return (

    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} rows={rows} setRows={setRows} setSelected={setSelected}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
              {items.map((row, index) => {
                  const isItemSelected = isSelected(row.queueID);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hoverT
                      onClick={(event) => handleClick(event, row.queueID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.queueID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.tableID}
                      </TableCell>
                      <TableCell align="center">{row.customerName}</TableCell>
                      <TableCell align="center">{row.waiterName}</TableCell>
                      <TableCell align="center">{row.numGuest}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.timeStart}</TableCell>
                      <TableCell align="center">{row.timeStop}</TableCell>
                      <TableCell align="center">{row.checkAmount}</TableCell>
                      <TableCell align="center">{row.tipsAmount}</TableCell>
                      <TableCell align="center">{row.totalAmount}</TableCell>





                    </TableRow>

                  );
                })}
                {/*Add Element Row*/}
               <TableRow
                      hoverT
               >
                     <TableCell>
                       <IconButton  className="addIcon" fontSize="large" onClick={handleSubmit}>
                       <AddBoxIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                      {stableSort(rows, getComparator(order, orderBy)).length+1}
                      </TableCell>
                      <TableCell align="center">
                      <Autocomplete
                      disablePortal
                 id="combo-box"
                 onChange={handleCustomers}
                  options={
                  customersNames.map((item,index)=>{
                  return {"label":item.name,"id":item.customerID}
                  })
                  }
                  sx={{ width: 150 }}
                renderInput={(params) => <TextField {...params} label="Customers" />}
    />
    
                      
                      
                      </TableCell>
                      <TableCell align="center">
                      <Autocomplete
                      disablePortal
                 id="combo-box"
                 onChange={handleWaiters}
                  options={
                  waitersNames.map((item,index)=>{
                  return {"label":item.name,"id":item.waiterID}
                  })
                  }
                  sx={{ width: 150 }}
                renderInput={(params) => <TextField {...params} label="Waiters" />}
    />
    
                      
                      
                      </TableCell>
                      <TableCell align="center">
                      <NumericField onChange={handleNumGuest}/>
                      </TableCell>
                      <TableCell align="center">
                      <LocalizationProvider dateAdapter={DateAdapter}>
                      <DatePicker
                      label="Date"
                      value={UTCDate}
                      inputFormat="MM/dd/yyyy"
                      onChange={handleDate}
                      renderInput={(params) => <TextField {...params} />}
                      />
                      </LocalizationProvider>
                      </TableCell>
                      <TableCell align="center">
                      <LocalizationProvider dateAdapter={DateAdapter}>
                      <TimePicker
                      label="Time"
                      value={UTCEnd}
                      onChange={handleStartTime}
                      renderInput={(params) => <TextField {...params} />}
                      />
                      </LocalizationProvider>
                      </TableCell>
                      <TableCell align="center">
                      <LocalizationProvider dateAdapter={DateAdapter}>
                      <TimePicker
                      label="Time"
                      value={UTCStart}
                      onChange={handleEndTime}
                      renderInput={(params) => <TextField {...params} />}
                      />
                      </LocalizationProvider>
                      </TableCell>
                
                      <TableCell align="center">
                      <NumericField onChange={handleCheck}/> 
                      </TableCell>
                      <TableCell align="center">
                      <NumericField onChange={handleTips}/> 
                      </TableCell>
                      <TableCell align="center">
                      <NumericField onChange={handleTotal}/> 
                      </TableCell>
                                    

                    </TableRow>
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
// import Row from "../Table/Row";
// import { useState } from "react";
// import Switcher from "../Switcher/Switcher";
// import { Fragment } from "react";
// import Submitter from "../Submitter/Submitter";
// import Filter from "../Filter/Filter";
// function Visits() {

//     //fetch table from backend, map each as seperate rows
//     const [display, setDisplay] = useState("table");
//     let keys = ["visit_id", "table_id", "customer_name", "waiter_name", "num_guest", "date", "time_start", "time_stop", "check_amount", "tips_amount", "total_amount"];

//     //change null and false and true to string on fetch?
//     let temp = [{   "visit_id": 1, 
//                     "table_id": 49, 
//                     "customer_name": "Charlie", 
//                     "waiter_name": "Wilson", 
//                     "num_guest": 8, 
//                     "date": "2021-10-31", 
//                     "time_start": "21:00:00", 
//                     "time_stop": "22:30:00", 
//                     "check_amount": 21.88, 
//                     "tips_amount": 4.50,
//                     "total_amount": 26.38}];

//     return (
//         <Fragment>
//             <h1>Visits History</h1>
//             <h2>Choose Action</h2>

//             <Switcher setDisplay={setDisplay}>
//             </Switcher >


//             {display === "table" &&
//                 <Fragment>
//                     <h2>Filter</h2>
//                     <Filter keys={keys} url="testurl"></Filter>

//                     <div className="flexTable">
//                         <div className="visitCell cell header">Visit ID</div>
//                         <div className="visitCell cell header" >Table #</div>
//                         <div className="visitCell cell header" >Customer</div>
//                         <div className="visitCell cell header" >Waiter</div>
//                         <div className="visitCell cell header" ># Guests</div>
//                         <div className="visitCell cell header" >Date</div>
//                         <div className="visitCell cell header" >Start</div>
//                         <div className="visitCell cell header" >End</div>
//                         <div className="visitCell cell header" >Check</div>
//                         <div className="visitCell cell header" >Tips</div>
//                         <div className="visitCell cell header" >Total</div>
//                         <div className="visitCell cell"></div>
//                         <div className="visitCell cell"></div>
//                         {temp.map((element, index) =>
//                             <Row cellClass="visitCell" data={element} keys={keys}></Row>
//                         )}

//                     </div>
//                 </Fragment>

//             }

//             {display != "table" &&
//                 <Submitter keys={keys} url="testurl"></Submitter>
//             }

//         </Fragment>

//     )

// }

// export default Visits;
