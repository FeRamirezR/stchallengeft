import React from "react";
import "./assets/css/styles.css";
import Home from "./Pages/Home";
import Medicines from "./Pages/Medicines";
import Patients from "./Pages/Patients";
import Prescriptions from "./Pages/Prescriptions";
import { Route, Switch } from "react-router-dom";
import Drawer from "./components/Drawer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Drawer />
      <Switch>
        <Route exact from="/" render={props => <Home {...props} />} />
        <Route exact path="/medicines" render={props => <Medicines {...props} />} />
        <Route exact path="/patients" render={props => <Patients {...props} />} />
        <Route exact path="/prescriptions" render={props => <Prescriptions {...props} />} />
      </Switch>
    </div>
  );
}
