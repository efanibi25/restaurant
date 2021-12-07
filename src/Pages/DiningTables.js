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
import LinearProgress from '@mui/material/LinearProgress';
import DiningTableEditForm from "../Component/EditForms/DiningTableEditForm.js"

function refreshPage() {
  window.location.reload();
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
    id: "table_id",
    numeric: true,
    disablePadding: true,
    label: "Table Number"
  },
  {
    id: "num_seat",
    numeric: true,
    disablePadding: false,
    label: "Number of Seats"
  },
  {
    id: "feature_id",
    numeric: false,
    disablePadding: false,
    label: "Feature ID"
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
    let filter = rows.filter((curr) => {
      if (!selected.includes(curr.table_id)) {
        return true
      } else {
        async function remove_Data() {
          const requestOptions = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "table_id": curr.table_id })
          }
          await fetch("/api/remove_diningtables", requestOptions)
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
    let tableId = document.getElementById("editingTableId").value || beforeEdit.table_id
    let numSeat = document.getElementById("editingNumSeat").value || beforeEdit.num_seat
    let featureId = document.getElementById("editingFeatureId").value || beforeEdit.feature_id

    async function updateData() {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "table_id": tableId,
          "num_seat": numSeat,
          "feature_id": featureId
        })
      }
      console.log(requestOptions)
      await fetch("/api/update_diningtables", requestOptions)
    }
    updateData()
  }


  const getCurrentData = () => {

    if (selected.length != 1) {
      return
    }
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].table_id == selected[0]) {
        return rows[i]
      }
    }
  }

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
              <DiningTableEditForm
                onSubmit={handleEdit}
                dataFromParent={getCurrentData()}
              />}
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
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
            Dining Tables
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
  const [loaded, setLoaded] = React.useState(false);
  const loadedRef = React.useRef(0)

  //insert valuesFha
  const [num_seat, setSeats] = React.useState(0);
  const [feature_id, setFeats] = React.useState(2);

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const getItems = (event) => {
    return stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  };

  const handleSeats = (event) => {
    setSeats(event.target.value)
  };

  const handleFeats = (event) => {
    setFeats(5)
  };

  const handleSubmit = (event) => {
    async function postData() {
      let post = await fetch(
        "/api/add_diningtable", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          feature_id: feature_id,
          num_seat: num_seat
        })
      })
      post = await post.json()
      if (post.output == true) {
        get_Data()
      }
    }
    postData()

  }


  const isSelected = (name) => selected.indexOf(name) !== -1;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  async function get_Data() {
    let data = await fetch("/api/get_diningtables")
    data = await data.json()
    if (!data.error) {
      loadedRef.current = loadedRef.current + 1
      setRows(data)
    }
  }
  React.useEffect(() => {
    get_Data()

  }, []);

  React.useEffect(() => {
    setItems(getItems())
  }, [rowsPerPage]);


  React.useEffect(() => {
    setItems(getItems())
    if (loadedRef.current == 1) {
      setLoaded(true)
    }
    else if (loadedRef.current > 1) {
      setPage(Math.floor((rows.length - 1) / rowsPerPage))      
      loadedRef.current = true
      setLoaded(true)
    }
  }, [rows]);

  React.useEffect(() => {
    setItems(getItems())
  }, [page]);
  return (

    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} rows={rows} setRows={setRows} setSelected={setSelected} />
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
                const isItemSelected = isSelected(row.table_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hoverT
                    onClick={(event) => handleClick(event, row.table_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.table_id}
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
                      {row.table_id}
                    </TableCell>
                    <TableCell align="center">{row.num_seat}</TableCell>
                    <TableCell align="center">{row.feature_id}</TableCell>
                  </TableRow>
                );
              })}
              {/*Add Element Row*/}
              <TableRow
                hoverT
              >
                <TableCell>
                  <IconButton className="addIcon" fontSize="large" onClick={handleSubmit}>
                    <AddBoxIcon />
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
                  <NumericField onChange={handleSeats} />
                </TableCell>
                <TableCell align="center">
                  {/* <TextField onChange={handleFeats}/> */}
                  
                  2
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
};