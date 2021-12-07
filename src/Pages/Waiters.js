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
import LinearProgress from '@mui/material/LinearProgress';
import WaiterEditForm from "../Component/EditForms/WaiterEditForm";

 
function createData(waiter_id, waiter_name) {
  return {
    waiter_id, 
    waiter_name, 
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
    id: "waiter_id",
    numeric: true,
    disablePadding: true,
    label: "Waiter Number"
  },
  {
    id: "waiter_name",
    numeric: false,
    disablePadding: false,
    label: "Name"
  }
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

  const 
  { 
    numSelected,
    selected,
    rows,setRows,
    setSelected 
  } = props;



  const getCurrentData = () => {

    if (selected.length != 1) {
      return
    }
    for (let i=0; i<rows.length; i++) {
      if (rows[i].waiter_id== selected[0]) {
        return rows[i]
      }
    }
  };

  const handleDelete = (event) => {
    let filter = rows.filter((curr) => {
      if (!selected.includes(curr.waiter_id)) {
        return true
      } else {
        async function remove_Data() {
          const requestOptions = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "waiter_id": curr.waiter_id })
          }
          let data=await fetch("/api/remove_waiter", requestOptions)
          
          data=data.json()
          //console.log(data)
        }
        remove_Data()
        return false
      }
    })
    setRows(filter)
    setSelected([])
  };
  const handleEdit = (event) => {

    const beforeEdit = getCurrentData()

    let id = document.getElementById("editingId").value
    let name = document.getElementById("editingName").value || beforeEdit.name

    if (beforeEdit.waiter_id == id) {

      async function updateData() {

        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            "waiter_id": id,
            "waiter_name": name, 
        })}
        //console.log("test")
      
        await fetch("/api/update_waiter", requestOptions)
      }
      updateData()
    }

    
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
          {numSelected == 1 && 
            <WaiterEditForm 
              onSubmit={handleEdit}
              dataFromParent={getCurrentData()}
              />}
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
          Waiters
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
  const [loaded, setLoaded] = React.useState(0);
  const loadedRef=React.useRef(0)


  //insert values
  const [name, setName] = React.useState("");
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.waiter_id);
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


   const handleWaiterName= (event) => {
    setName(event.target.value)
   };


   const handleSubmit= (event) => {
    //console.log(name,"we need to submit this to db")
    async function postData(){
      let post= await fetch(
        "/api/add_waiter",{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            name:name
            })
        })
        post=await post.json()
        //console.log("Customer Insert",post)
        if (post.output==true){
          loadedRef.current=loadedRef.current+1
          get_Data()
        }

    }
    postData()
   };
 

  const isSelected = (name) => selected.indexOf(name) !== -1;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    async function get_Data(){
      let data=await fetch("/api/get_waiters")
      data=await data.json()
      if(!data.error){
        loadedRef.current=loadedRef.current+1
        setRows(data)
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
      if(loadedRef.current==1){
        setLoaded(true)
      }
      else if(loadedRef.current>1){
        setPage(Math.floor((rows.length-1)/rowsPerPage))

        setLoaded(true)
      }
    },[rows]);
    
    React.useEffect(() => {
      setItems(getItems())
    },[page]);

  


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
                  const isItemSelected = isSelected(row.waiter_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hoverT
                      onClick={(event) => handleClick(event, row.waiter_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.waiter_id}
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
                        {row.waiter_id}
                      </TableCell>
                      <TableCell align="center">{row.waiter_name}</TableCell>
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
                      <TextField onChange={handleWaiterName}/> 
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
        </TableContainer> : <LinearProgress />}
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
export{createData}