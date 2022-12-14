import React from "react";
import MaterialTable from "material-table";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
//action icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';

import { forwardRef } from 'react';

//icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const Table = (props) => {
    //page data import
    const {
        columns,
        dataApi,
        title,
        editAction,
        insertAction,
        deleteAction
      } = props;
    //styles
    const theme = createMuiTheme({
        palette: {
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#ff9100',
        },
        },

    });
    //table
    return (
        <div>
        <MuiThemeProvider theme={theme}>
            <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={dataApi}
            title={title}
            actions={[
                {
                icon: EditIcon,
                tooltip: 'editar',
                onClick: (event, rowData) => editAction(rowData, 'Editar')
                },
                {
                icon: DeleteIcon,
                tooltip: 'borrar',
                onClick: (event, rowData) => deleteAction(rowData, 'Eliminar')
                },
                {
                icon: AddIcon,
                tooltip: 'Agregar',
                isFreeAction: true,
                onClick: insertAction
                }
            ]}
            options={{actionsColumnIndex: -1}}
            localization={{
                header:{
                actions:'Acciones'
                }
            }}
            />
        </MuiThemeProvider>
        </div>
    );
};

export default Table;
