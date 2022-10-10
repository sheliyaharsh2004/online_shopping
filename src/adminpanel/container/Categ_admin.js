import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import { deletedoctor, doctordata, postdoctordata, updatedoctor,} from '../../Redux/Action/doctor.action';

function Catag_admin(props) {

  const [userType, setUserType] = useState("Catagory");
  const [open, setOpen] = useState(false);
  const [docopen, setDocopen] = useState(false);
  const [docdid, setDocdid] = useState('');
  const [update, setUpdate] = useState('');
  const [eid, setEid] = useState('');
  const dispatch = useDispatch();

  const categ = useSelector(state => state.doctor);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDClickOpen = (id) => {
    setDocopen(true);
    setDocdid(id);
  };

  const handleClickEditOpen = (params) => {
    console.log(params.row);
    setOpen(true);

    formik.setValues({
      ...params.row,
      file: params.row.file
    })

    setEid(params.id);
    setUpdate(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDocopen(false);
  };

  let schema = yup.object().shape({
    categ_name: yup.string().required("Please enter name"),
    // categ_price: yup.string().required("Please enter Price"),
    file: yup.mixed().required("please upload file")
  });

  const formik = useFormik({
    initialValues: {
      categ_name: '',
      // categ_price: '',
      file: ''
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {

      if (update) {
        handleEdit(values)
      } else {
        dispatch(postdoctordata(values))

        handleClose();
        getData();
        resetForm();
      }
    }
  });

  const handleEdit = (values) => {
    dispatch(updatedoctor(values))

    getData();
    setOpen(false);
    setUpdate(false);
    setEid();
  }

  const getData = () => {
  }

  useEffect(
    () => {
      dispatch(doctordata())
      getData();
    },
  []);

  const handleDelete = () => {
    dispatch(deletedoctor(docdid))

    getData();
    setDocopen(false);
  }


  const columns = [
    { field: 'categ_name', headerName: 'Catagory Name', width: 130 },
    // { field: 'categ_price', headerName: 'categ Price', width: 130 },
    {
      field: 'file', headerName: 'Catagory Image', width: 130,
      renderCell: (params) => (
        <img src={params.row.file} width="50" height={50} />
      )
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              className="border-primary"
              onClick={() => handleDClickOpen(params.row)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleClickEditOpen(params)}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div style={{marginTop : "150px"}}>
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Catagory admin</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex-column align-items-center">
        <Button variant="contained" className="border-1" type="submit" onClick={handleClickOpen}>
          Add Catagory
        </Button>
      </div>
      <div>
        <div className="p-4" style={{ height: 419, width: '100%' }}>
          <DataGrid
            rows={categ.doctor}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Empoyee Data</DialogTitle>
            <Formik value={formik}>
              <Form key={formik} onSubmit={formik.handleSubmit}>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="categ_name"
                    name="categ_name"
                    value={formik.values.categ_name}
                    label="categ Name"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                  />
                  {
                    formik.errors.categ_name ? <p>{formik.errors.categ_name}</p> : null
                  }
                  {/* <TextField
                    autoFocus
                    margin="dense"
                    id="categ_price"
                    name="categ_price"
                    value={formik.values.categ_price}
                    label="categ price"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                  />
                  {
                    formik.errors.categ_price ? <p>{formik.errors.categ_price}</p> : null
                  } */}
                  <input
                    autoFocus
                    margin="dense"
                    type="file"
                    id="file"
                    name="file"
                    label="Upload File"
                    fullWidth
                    variant="standard"
                    onChange={(e) => formik.setFieldValue('file', e.target.files[0])}
                  />
                  {
                    formik.errors.file ? <p>{formik.errors.file}</p> : null
                  }
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </Form>
            </Formik>
          </Dialog>
          <Dialog
            open={docopen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are You Sure Delete Data?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleDelete} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Catag_admin;