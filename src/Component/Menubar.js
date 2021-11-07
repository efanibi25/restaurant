import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function MenuBar() {

    const classes = useStyles();

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Resterant Management System
                </Typography>
                <div className={classes.navlinks}>
                    <Link to="/" className={classes.link}>
                        Home
                    </Link>
                    <Link to="/diningtables" className={classes.link}>
                        Dining Tables
                    </Link>
                    <Link to="/customers" className={classes.link}>
                        Customers
                    </Link>
                    <Link to="/Waitlist" className={classes.link}>
                        Waitlist
                    </Link>
                    <Link to="/Waiters" className={classes.link}>
                        Waiters
                    </Link>
                    <Link to="/Visits" className={classes.link}>
                        Visits
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default MenuBar;
