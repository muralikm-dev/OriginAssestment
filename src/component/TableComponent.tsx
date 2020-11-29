import React, { ReactElement, useState, ChangeEvent, useEffect } from "react";
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

import EditIcon from "@material-ui/icons";
import { fetchDetails, updateDetails, fetchAwsDetails } from "../redux/userdetails/actions";
import { userDetailsSelector, updatedSelector, updatedDetailsSelector, awsDetailsSelector } from "../redux/userdetails/selector";
import ReactDataGrid  from "react-data-grid";
import { UserDetails } from "../redux/userdetails/types";
import MaterialTable from "material-table";

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

     // const [data, setData] = useState(userDetails);

     const updateUserDetails = (newList: UserDetails[]) => {
        dispatch(updateDetails(newList));
        // setData(newList);        
     }

     const isUpdated = useSelector(updatedSelector);
     // console.log(isUpdated);

     const updatedDetails = useSelector(updatedDetailsSelector);
     console.log(updatedDetails);

     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: any, field: any): void => {
         const { value } = event.currentTarget;
         console.log(value);
         console.log(id);
         console.log(field);
         let newUpdatedList: UserDetails[] = [];
         const rowIndex = userDetails.findIndex(td => td.ID === id);
         const userDet = userDetails[rowIndex];
         
         userDetails.map(userDet => {
            newUpdatedList.push({
                ID: userDet.ID,
                name: field === 'name' && userDet.ID === id ? value : userDet.name,
                email: field === 'email' && userDet.ID === id ? value : userDet.email,
                address: field === 'address' && userDet.ID === id ? value : userDet.address 
            })
         })
         
         updateUserDetails(newUpdatedList);
     }

     const [buttonPressed, setButtonPressed] = React.useState(false);
     
     const handleButton = (): void => {
        dispatch(fetchAwsDetails());
        setButtonPressed(true);
     }

     const awsDetails = useSelector(awsDetailsSelector);
     console.log(awsDetails);

    return (
        <>
        <Container className={classes.root} maxWidth="xl" disableGutters>
        <TableContainer component={Paper} className={classes.tableBody}>
        <Table stickyHeader size="small">
            <TableHead>
                <TableRow className={classes.headerRow}>
                    <TableCell className={classes.tableCell}>
                        ID
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        Name
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        Email
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        Address
                    </TableCell>                    
                </TableRow>
            </TableHead>
            <TableBody>
            {userDetails.map((row) => (
              <TableRow key={row.ID}>
                <TableCell>
                    {row.ID}
                </TableCell>
                <TableCell align="right">
                <TextField
                        id="name"
                        name="name"
                        variant="standard"
                        type="required"
                        defaultValue={
                            row.name
                        }
                        multiline
                        fullWidth
                        onChange={(e) => handleChange(e,row.ID, 'name')}                            
                    />
                </TableCell>
                <TableCell align="right">
                <TextField
                            id="address"
                            name="address"
                            variant="standard"
                            type="required"
                            defaultValue={
                              row.address
                            }
                            multiline
                            fullWidth
                            onChange={(e) => handleChange(e,row.ID, 'address')}                            
                          />
                </TableCell>
                <TableCell align="right">
                    <TextField
                        id="email"
                        name="email"
                        variant="standard"
                        type="required"
                        defaultValue={
                           row.email
                        }
                        multiline
                        fullWidth
                        onChange={(e) => handleChange(e,row.ID, 'email')}                            
                    />
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
            <Button onClick={handleButton} variant="contained" color="primary">
                <Tooltip title="Click to Fetch the region from AWS">
                    <Typography variant="inherit">Fetch AWS</Typography>
                </Tooltip>
            </Button>
            {buttonPressed &&
                <TextField
                    id="email"
                    name="email"
                    variant="filled"
                    type="required"
                    defaultValue={awsDetails.region + ' ' + awsDetails.version}                    
                    multiline
                    fullWidth
                />
            }
        </Container>    
        </>
        
    )
  
}

  
