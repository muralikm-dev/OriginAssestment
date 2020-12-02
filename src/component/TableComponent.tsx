import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    makeStyles,
    Container,
    Button,
    Typography,
    Tooltip
  } from "@material-ui/core";

import { fetchDetails, updateDetails, fetchAwsDetails } from "../redux/userdetails/actions";
import { userDetailsSelector, updatedSelector, updatedDetailsSelector, awsDetailsSelector } from "../redux/userdetails/selector";
import { UserDetails } from "../redux/userdetails/types";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CellClickedEvent, CellValueChangedEvent } from "ag-grid-community";

export const TableComponent = (): ReactElement => {

    const useStyles = makeStyles({
        root: {
          textAlign: "center"
        },
        headerRow: {
          "& > th": {
            paddingLeft: "2rem"
          }
        },
        tableBody: {
          height: "675px",
          overflowY: "auto"
        },
        tableCell: {
          width: "1px",
          padding: "20px"
        },       
      });
      
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchDetails())
    }, []);

  
     const userDetails = useSelector(userDetailsSelector);
     console.log(userDetails);

     // Not Needed for the ag-grid
     /* const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: any, field: any): void => {
         const { value } = event.currentTarget;
         console.log(value);
         console.log(id);
         console.log(field);
         let newUpdatedList: UserDetails[] = [];
         const rowIndex = userDetails.findIndex(td => td.ID === id);
         const userDet = userDetails[rowIndex];
         console.log(userDet);
         console.log(userDetails);
         // Bit crude way of doing it need to replace with icon selection and dialog box or use a grid framework to do it
         /* userDetails.map(userDet => {
            newUpdatedList.push({
                ID: userDet.ID,
                name: field === 'name' && userDet.ID === id ? value : userDet.name,
                email: field === 'email' && userDet.ID === id ? value : userDet.email,
                address: field === 'address' && userDet.ID === id ? value : userDet.address 
            })
         })
         
         updateUserDetails(userDetails);
     }*/

     const updateUserDetails = (newList: UserDetails[]) => {
        dispatch(updateDetails(newList));                
     }

     const isUpdated = useSelector(updatedSelector);
     console.log(isUpdated);

     const updatedDetails = useSelector(updatedDetailsSelector);
     console.log(updatedDetails);

     const [buttonPressed, setButtonPressed] = React.useState(false);
     const [updateDisable, setUpdateDisable] = React.useState(true);
     
     const handleButton = (): void => {
        dispatch(fetchAwsDetails());
        setButtonPressed(true);
     }

     const awsDetails = useSelector(awsDetailsSelector);
     console.log(awsDetails);

     const [gridApi, setGridApi] = useState(null);
     const [gridColumnApi, setGridColumnApi] = useState(null);

     const columns = [
         {headerName: "ID", field: "ID"},
         {headerName: "Name", field: "name", editable:true},
         {headerName: "Email", field: "email", editable:true},
         {headerName: "Address", field: "address", editable:true}
     ];

     const onGridReady = (params: any) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
     }

     const valueChanged = (params: CellValueChangedEvent) => {
         console.log(params.rowIndex);
         console.log(params.oldValue);
         console.log(params.newValue);
         const userDet = userDetails[params.rowIndex];
         console.log(userDet);
         console.log(userDetails);
         setUpdateDisable(false);         
     }

     const handleUpdate = () => {
        updateUserDetails(userDetails);
     }

    return (
        <>
        <Container className={classes.root} maxWidth="xl" disableGutters>
            
            <div className="ag-theme-alpine" style={ { height: 500, width: 1000, textAlign: "center" } }>
                <AgGridReact onGridReady={e => onGridReady(e)}
                    rowData={userDetails} columnDefs={columns}
                    onCellValueChanged={e => valueChanged(e)}
                    >                    
                </AgGridReact>
                
                <Button onClick={handleUpdate} variant="contained" color="primary" disabled={updateDisable}>
                    <Tooltip title="Update the Grid">
                        <Typography variant="inherit">Update Grid</Typography>
                    </Tooltip>
                </Button>
                
                <Button onClick={handleButton} variant="contained" color="primary">
                    <Tooltip title="Click to Fetch the region from AWS">
                        <Typography variant="inherit">Fetch AWS</Typography>
                    </Tooltip>
                </Button>
                {buttonPressed &&
                    <TextField
                        id="awsDetails"
                        name="awsDetails"
                        variant="filled"
                        type="required"
                        value={awsDetails.region + ' ' +awsDetails.version}                    
                        multiline
                        fullWidth
                    />
                }
            </div>
        </Container>    
        </>
        
    )
  
}

  