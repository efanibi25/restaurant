import * as React from "react";
import { Fragment } from "react";
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
import Autocomplete from '@mui/material/Autocomplete';
import TimePicker from '@mui/lab/TimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LinearProgress from '@mui/material/LinearProgress';
import CurrencyTextField from '@kylebeikirch/material-ui-currency-textfield'







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
        id: "visits_id",
        numeric: true,
        disablePadding: true,
        label: "Visits ID"
    },
  {
    id: "table_id",
    numeric: true,
    disablePadding: true,
    label: "Table ID"
  },
  {
    id: "customer_id",
    numeric: false,
    disablePadding: false,
    label: "Customer ID"
  },
  {
    id: "waiter_id",
    numeric: false,
    disablePadding: false,
    label: "Waiter ID"
  },
  {
    id: "numGuest",
    numeric: true,
    disablePadding: false,
    label: "Guest Count"
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
  const {
    numSelected,
    rows,
    selected,
    setRows,
    setSelected
  } = props;
  const handleDelete = (event) => {
    let filter=rows.filter((curr)=>{
      if(!selected.includes(curr.table_id)){
        return true
      }
    }
    )
    setRows(filter)
    setSelected([])
  };

  return (
    <Toolbar className="toolbar"
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
         <Fragment>
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
       </Fragment>
      ) : (
        <Fragment>
        <Typography
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Visits
        </Typography>
          <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        </Fragment>
      )}

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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [items, setItems] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [loaded, setLoaded] = React.useState([]);
  let loadedRef=React.useRef(0)

  const [customersNames, setCustomersNames] = React.useState([]);
  const [waitersNames, setWaitersNames] = React.useState([]);
  const [UTCStart, setUTCStart] = React.useState(new Date());
  const [UTCEnd, setUTCEnd] = React.useState(new Date());
  const [tablesList, setTablesList] = React.useState([]);

  //insert values
  const [numGuest, setNumGuest] = React.useState(0);
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [customerID, setCustomerID] = React.useState([]);
  const [waiterID, setWaiterID] = React.useState([]);
  const [check, setCheck] = React.useState(0);
  const [tip, setTips] = React.useState(0);
  const [tableID, setTable] = React.useState();




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.table_id);
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

  const getItems = (event) => {
    return stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  };


  const handleCustomers= (event,newValue) => {
   setCustomerID(newValue.id)
  };


  const handleWaiters= (event,newValue) => {
    setWaiterID(newValue.id)
   };

   const handleTable= (event,newValue) => {
    setTable(newValue.id)
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
    console.log(customerID,waiterID,numGuest,startTime,endTime,check,tip,tableID)
    async function postData(){
      let post= await fetch(
        "/api/add_visit",{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            customer_id:customerID,
            waiter_id:waiterID,
            num_guest:numGuest,
            time_start:startTime,
            time_stop:endTime,
            check_amount:check,
            tips_amount:tip,
            table_id:tableID
            })
        })
        post=await post.json()
        console.log("Customer Insert",post)
        if (post.output==true){
          get_Data()
        }

    }
    postData()
   
   };

 
   const handleCheck= (event) => {
    setCheck(event.target.value)
   };

   const handleTip= (event) => {
    setTips(event.target.value)
   };



  const isSelected = (name) => selected.indexOf(name) !== -1;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    async function get_Data(){
      let data=await fetch("/api/get_visits")
      data=await data.json()
      console.log(data)
      if(!data.error){
        loadedRef.current=loadedRef.current+1
        setRows(data)
      }
    

      let data2=await fetch("/api/get_customers") 
      data2= await data2.json()
      if(!data2.error){
        setCustomersNames(data2)
      }

      let data3=await fetch("/api/get_waiters") 
      data3= await data3.json()
      if(!data3.error){
        setWaitersNames(data3)
      }

      let data4=await fetch("/api/get_diningtables") 
      data4= await data4.json()
      if(!data4.error){
        
        setTablesList(data4)
      }


    }

    React.useEffect(() => {
  
        get_Data()
  
      },[]);

    React.useEffect(() => {
      setItems(getItems())
    },[rowsPerPage]);

    React.useEffect(() => {
      setItems(getItems())
    },[rows]);

    React.useEffect(() => {
       if(loadedRef.current==1){
           setLoaded(true)
       }
       else if(loadedRef.current>1){
        setPage(Math.floor((rows.length-1)/rowsPerPage))
        setLoaded(true)
      }
      },[tablesList]);
    
    React.useEffect(() => {
      setItems(getItems())
    },[page]);

    React.useEffect(() => {
      setStartTime(UTCStart.getTime())
    },[UTCStart]);

    React.useEffect(() => {
        setEndTime(UTCEnd.getTime())
      },[UTCEnd]);

 

 


  return (

    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} rows={rows} setRows={setRows} setSelected={setSelected}/>
        {loaded ? <TableContainer>
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
                  const isItemSelected = isSelected(row.visit_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hoverT
                      onClick={(event) => handleClick(event, row.visit_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.visit_id}
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
                        {row.visit_id}
                      </TableCell>
                      <TableCell align="center">{row.table_id}</TableCell>
                      <TableCell align="center">{row.customer_id}</TableCell>
                      <TableCell align="center">{row.waiter_id}</TableCell>
                      <TableCell align="center">{row.num_guest}</TableCell>
                      <TableCell align="center">                      
                      {new Date(row.time_start).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell align="center">
                      {new Date(row.time_stop).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell align="center">{row.check_amount.toFixed(2)}</TableCell>
                      <TableCell align="center">{row.tips_amount.toFixed(2)}</TableCell>




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
                      ID
                      </TableCell>
                      <TableCell align="center">
                      <Autocomplete
                      disablePortal
                 id="combo-box"
                 onChange={handleTable}
                 isOptionEqualToValue={(option, value) => option.value === value.value}
                  options={
                  tablesList.map((item,index)=>{
                  return {"label":item.table_id.toString(),"id":item.table_id}
                  })
                  }
                  sx={{ width: 150 }}
                renderInput={(params) => <TextField {...params} label="Tables" />}
    />
    
                      
                      
                      </TableCell>
                      <TableCell align="center">
                      <Autocomplete
                      disablePortal
                 id="combo-box"
                 onChange={handleCustomers}
                 isOptionEqualToValue={(option, value) => option.value === value.value}

                  options={
                  customersNames.map((item,index)=>{
                  return {"label":item.customer_name,"id":item.customer_id}
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
                 isOptionEqualToValue={(option, value) => option.value === value.value}

                  options={
                  waitersNames.map((item,index)=>{
                  return {"label":item.waiter_name,"id":item.waiter_id}
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
                      <TimePicker
                      label="Time"
                      value={UTCStart}
                      onChange={handleStartTime}
                      renderInput={(params) => <TextField {...params} />}
                      />
                      </LocalizationProvider>
                      </TableCell>
                      <TableCell align="center">
                      <LocalizationProvider dateAdapter={DateAdapter}>
                      <TimePicker
                      label="Time"
                      value={UTCEnd}
                      onChange={handleEndTime}
                      renderInput={(params) => <TextField {...params} />}
                      />
                      </LocalizationProvider>
                      </TableCell>
                
                      <TableCell align="center">
                      <CurrencyTextField
		label="Check"
		variant="outlined"
		value={check}
		currencySymbol="$"
		minimumValue="0"
		outputFormat="number"
		decimalCharacter="."
		digitGroupSeparator=","
		onChange={handleCheck}
    />
                      </TableCell>
                      <TableCell align="center">
                      <CurrencyTextField
		label="Tips"
		variant="outlined"
		value={tip}
		currencySymbol="$"
		minimumValue="0"
		outputFormat="number"
		decimalCharacter="."
		digitGroupSeparator=","
		onChange={handleTip}
    decimalPlaces="2"
    />
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
        </TableContainer>: <LinearProgress />}
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