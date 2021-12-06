import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useTheme,
    useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(5),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
}));

function MenuBar() {

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Restaurant Management System
                </Typography>
                {isMobile ? (
                    <DrawerComponent />
                ) : (


                    <div className={classes.navlinks}>
                        <Link to="/" className={"link"}>
                            Home
                        </Link>
                        <Link to="/diningtables" className={"link"}>
                            Dining Tables
                        </Link>
                        <Link to="/customers" className={"link"}>
                            Customers
                        </Link>
                        <Link to="/Waitlist" className={"link"}>
                            Waitlist
                        </Link>
                        <Link to="/Waiters" className={"link"}>
                            Waiters
                        </Link>
                        <Link to="/Visits" className={"link"}>
                            Visits
                        </Link>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default MenuBar;
