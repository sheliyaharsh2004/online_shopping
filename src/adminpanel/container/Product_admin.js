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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addProductdata, deletCatagorydata, getProduct, updateCatagoryata } from '../../Redux/Action/product.action';
import { doctordata } from '../../Redux/Action/doctor.action';

function Product_admin(props) {

  const [open, setOpen] = useState(false);
  const [docopen, setDocopen] = useState(false);
  const [docdid, setDocdid] = useState('');
  const [update, setUpdate] = useState('');
  const [eid, setEid] = useState('');
  const dispatch = useDispatch();

  const categ = useSelector(state => state.doctor);
  const product = useSelector(state => state.product);
  const productdata = product.product;
 console.log(categ.doctor);
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
    product_name: yup.string().required("Please enter name"),
    product_price: yup.string().required("Please enter Price"),
    product_list: yup.string().required("Please enter product"),
    product_description: yup.string().required("Please enter product"),
    file: yup.mixed().required("please upload imagrs")
  });

  const formik = useFormik({
    initialValues: {
      product_name: '',
      product_price: '',
      product_list: '',
      product_description: '',
      file: ''
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {

      if (update) {
        handleEdit(values)
      } else {
        dispatch(addProductdata(values))

        handleClose();
        getData();
        resetForm();
      }
    }
  });
  console.log(formik.errors);
  const handleEdit = (values) => {
    dispatch(updateCatagoryata(values))

    getData();
    setOpen(false);
    setUpdate(false);
    setEid();
  }

  const getData = () => {
  }

  useEffect(
    () => {
      dispatch(getProduct())
      dispatch(doctordata())
      getData();
    },
    []);

  const handleDelete = () => {
    dispatch(deletCatagorydata(docdid))

    getData();
    setDocopen(false);
  }


  const columns = [
    { field: 'product_name', headerName: 'Product Name', width: 130 },
    { field: 'product_price', headerName: 'Product Price', width: 130 },
    { field: 'product_list', headerName: 'Product Type', width: 130 },
    { field: 'product_description', headerName: 'Product Description', width: 130 },
    {
      field: 'file', headerName: 'Product Image', width: 130,
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
    <div style={{ marginTop: "150px" }}>
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Product admin</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex-column align-items-center">
        <Button variant="contained" className="border-1" type="submit" onClick={handleClickOpen}>
          Add Product
        </Button>
      </div>
      <div>
        <div className="mt-3" style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={productdata}
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
                    id="product_name"
                    name="product_name"
                    value={formik.values.product_name}
                    label="product Name"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                  />
                  {
                    formik.errors.product_name ? <p>{formik.errors.product_name}</p> : null
                  }
                  <TextField
                    autoFocus
                    margin="dense"
                    id="product_price"
                    name="product_price"
                    value={formik.values.product_price}
                    label="product price"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                  />
                  {
                    formik.errors.product_price ? <p>{formik.errors.product_price}</p> : null
                  }
                  <FormControl fullWidth className='mt-4'>
                    <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="product_list"
                      name='product_list'
                      value={formik.values.product_list}
                      onChange={formik.handleChange}>
                      {
                        categ.doctor.map((c) => {
                          return (
                            <MenuItem value={c.categ_name}>{c.categ_name}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                  {
                    formik.errors.product_list ? <p>{formik.errors.product_list}</p> : null
                  }
                  <TextField
                    className='mt-3'
                    autoFocus
                    margin="dense"
                    id="product_description"
                    name="product_description"
                    value={formik.values.product_description}
                    label="product description"
                    fullWidth
                    variant="standard"
                    onChange={formik.handleChange}
                  />
                  {
                    formik.errors.product_description ? <p>{formik.errors.product_description}</p> : null
                  }
                  <input
                    autoFocus
                    margin="dense"
                    type="file"
                    id="file"
                    name="file"
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

export default Product_admin;