import React, { useState } from 'react';
import { doctordata } from '../../Redux/Action/doctor.action';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';

function Order_admin(props) {
    const dispatch = useDispatch();
    const [showData, setEShowData] = useState([]);
    const doctor = useSelector(state => state.doctor)

    const getEData = () => {
        setEShowData(doctor.doctor);
    }

    useEffect(() => {
        dispatch(doctordata())
        getEData();
    }, [])

    const handleClickDOpen = () => {

    }
    const handleClickEOpen = () => {
        
    }
    const handleClickOpen = () => {
        
    }


    let columns = [
        { field: 'product_name', headerName: 'Product Name', width: 130 },
        { field: 'url', headerName: 'Image', width: 130,
            renderCell: (params) => (
                    <img src={params.row.url} style={{width: "50px",height: "50px", borderRadius: "50%", margin: "auto"}} />
                )
        },
        {
            field: 'action', headerName: 'Action', width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton onClick={() => handleClickDOpen(params.row)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>

                        <IconButton onClick={() => handleClickEOpen(params)} aria-label="Edit">
                            <EditIcon />
                        </IconButton>
                    </>
                )
            }

        },
    ]

    return (
        <div style={{marginTop : "150px"}}>
            <div className="page-heading" id="top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-content">
                                <h2>Order admin</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className='admin_cont row flex-column align-items-center'>
                    <div className='add_category'>
                        <Button onClick={handleClickOpen} variant="contained">Add Category</Button>
                    </div>
                </div>
                <div className='p-4' style={{ height: 419, width: '100%' }}>
                    <DataGrid
                        rows={doctor.doctor}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </div>
    );
}

export default Order_admin;