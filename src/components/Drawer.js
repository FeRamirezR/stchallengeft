import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Home from "@material-ui/icons/Home";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MedicationIcon from '@mui/icons-material/Medication';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "200px"
  }
});

const Drawer = (props) => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Pagina Principal",
      icon: <Home />,
      onClick: () => history.push("/")
    },
    {
      text: "Pacientes",
      icon: <AssignmentIndIcon />,
      onClick: () => history.push("/patients")
    },
    {
      text: "Medicamentos",
      icon: <MedicationIcon />,
      onClick: () => history.push("/medicines")
    },
    {
      text: "Prescripción",
      icon: <TextSnippetIcon />,
      onClick: () => history.push("/prescriptions")
    }
  ];
  return (
    <MUIDrawer variant="permanent" className={classes.drawer}>
      <List className={classes.drawer}>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
