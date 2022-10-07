import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, deletecart, increment } from '../../Redux/Action/Cart.action';
import { getProduct } from '../../Redux/Action/product.action';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Formik, useFormik } from 'formik';
import { DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { postOrder } from '../../Redux/Action/order.action';
import { Button } from 'react-bootstrap';


function Cart(props) {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product);
    const cartProducts = useSelector(state => state.cart);
    const productsData = products.product;
    const cartProductsData = cartProducts.cart;
    const [placeOrder, setPlaceOrder] = useState(false);

    let schema = yup.object().shape({
        email: yup.string().required("Please Enter Email"),
        name: yup.string().required("Please Enter Name"),
        phone: yup.string().required("Please Enter phone"),
        address: yup.string().required("Please Enter addres"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '',
            address: '',
        },
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {

            let data = {
                userDetails: values,
                cartDetails: cartData
            }

            console.log("data", data);

            dispatch(postOrder(data));
            resetForm();
        },
    });

    const cartData = [];
    let Total;

    productsData.map((p) => {
        cartProductsData.map((c) => {
            if (p.id === c.id) {
                let Data = {
                    ...p,
                    quantity: c.quantity
                }
                cartData.push(Data)
            }
        })
    })

    let TotalAmount = 0;
    cartData.map((c) => {
        Total = c.product_price * c.quantity;
        TotalAmount = TotalAmount + Total;
    })

    const Discount = Math.round(TotalAmount * 0.05);
    const FinalAmount = TotalAmount - Discount;

    const handleIncrement = (id) => {
        dispatch(increment(id))
    }

    const handleDecrement = (id) => {
        dispatch(decrement(id))
    }

    useEffect(() => {
        dispatch(getProduct());
    }, [])

    const handleDelete = (id) => {
        dispatch(deletecart(id));
    }

    const handelOrder = () => {
        setPlaceOrder(true);
    }

    return (

        <div className='product_details Cart_Details section'>
            <div className='container'>
                <div className="row">
                    <div className='col-lg-9'>
                        { placeOrder ?
                            <Formik value={formik}>
                                <Form key={formik} onSubmit={formik.handleSubmit}>
                                    <DialogTitle>Place Order</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus={true}
                                            margin="dense"
                                            name='email'
                                            id="email"
                                            label="Email"
                                            type="text"
                                            value={formik.values.email}
                                            fullWidth
                                            variant="standard"
                                            onChange={formik.handleChange}
                                        />
                                        {
                                            formik.errors.email ?
                                                <p className='error'>{formik.errors.email}</p> : null
                                        }
                                        <TextField
                                            margin="dense"
                                            id="product_price"
                                            label="Name"
                                            name='name'
                                            type="text"
                                            value={formik.values.name}
                                            fullWidth
                                            variant="standard"
                                            onChange={formik.handleChange}
                                        />
                                        {
                                            formik.errors.name ?
                                                <p className='error'>{formik.errors.name}</p> : null
                                        }
                                        <TextField
                                            margin="dense"
                                            id="phone"
                                            label="Phone"
                                            name='phone'
                                            type="number"
                                            value={formik.values.phone}
                                            fullWidth
                                            variant="standard"
                                            onChange={formik.handleChange}
                                        />
                                        {
                                            formik.errors.phone ?
                                                <p className='error'>{formik.errors.phone}</p> : null
                                        }
                                        <TextField
                                            margin="dense"
                                            id="Address"
                                            label="Address"
                                            name='address'
                                            type="text"
                                            value={formik.values.address}
                                            fullWidth
                                            variant="standard"
                                            onChange={formik.handleChange}
                                        />
                                        {
                                            formik.errors.address ?
                                                <p className='error'>{formik.errors.address}</p> : null
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <Button type='submit'>Submit</Button>
                                    </DialogActions>
                                </Form>
                            </Formik> :
                            <div className="section-heading">
                                <h2 className='mt-5'>Add to Cart Items</h2>
                                {
                                    cartData.map((c) => (
                                        <>
                                            <div className='AddCartBox mt-5'>
                                                <div className='CartProductDetails mb-2'>
                                                    <div className='productImg' style={{ height: "130px", width: "112px", overflow: "hidden" }}>
                                                        <img src={c.file} width="100%" height="auto" />
                                                    </div>
                                                    <div className='ProductItem'>
                                                        <h3>{c.product_name}</h3>
                                                        <p className='mb-4 product_price'>₹{c.product_price}</p>
                                                        <div className='quantity buttons_added'>
                                                            <input disabled={c.quantity === 1 && true} onClick={() => handleDecrement(c.id)} type="button" defaultValue="-" className="minus" />
                                                            <div className='input'>
                                                                <input type="number" value={c.quantity} className="input-text qty text" size={4} pattern inputMode />
                                                            </div>
                                                            <input onClick={() => handleIncrement(c.id)} type="button" defaultValue="+" className="plus" />
                                                        </div>
                                                    </div>
                                                    <div className='main-border-button' >
                                                        <div className='deleteItem' onClick={() => handleDelete(c.id)}><DeleteIcon /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                                <div className='main-border-button add-box mt-4'>
                                    <Link to={"/products"} className='addItem'>Add Item</Link>
                                    <a className='addItem PlaceOrder ' onClick={handelOrder}>Place Order</a>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='col-lg-3'>
                        <div className='Price_Details'>
                            <h2 className="title mt-5">Price Details</h2>
                            <div className='details'>
                                <p>Price ({cartData.length} item) <span>₹ {TotalAmount}</span></p>
                                <p>Discount<span>- ₹ {Discount}</span></p>
                            </div>
                            <div className='amount'>
                                <p>Total Amount <b><span>₹ {FinalAmount}</span></b></p>
                            </div>
                            <p className='save'>You will save ₹ {Discount} on this order</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;