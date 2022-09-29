import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, deletecart, increment } from '../../Redux/Action/Cart.action';
import { getProduct } from '../../Redux/Action/product.action';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart(props) {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product);
    const cartProducts = useSelector(state => state.cart);
    const productsData = products.product;
    const cartProductsData = cartProducts.cart;
    console.log(cartProductsData, productsData);


    console.log("cartProductsData", cartProductsData);
    const cartData = [];
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
    console.log("cartData", cartData);  


    const handleIncrement = (id) => {
        dispatch(increment(id))
    }

    const handleDecrement = (id) => {

        console.log(id);
        dispatch(decrement(id))
    }

    useEffect(() => {
        dispatch(getProduct());
    }, [])

    const handleDelete = (id) => {
        dispatch(deletecart(id));
    }

    return (

        <div className='product_details Cart_Details section'>
            <div className='container'>
                <div className="row">
                    <div className='col-lg-10'>
                        <div className="section-heading">
                            <h2 className='mt-5'>Our Latest Category</h2>
                        </div>
                        {
                            cartData.map((c) => (
                                <>
                                    <div className='AddCartBox mt-3'>
                                        <div className='CartProductDetails'>
                                            <div className='productImg' style={{ height: "112px", width: "112px", overflow: "hidden" }}>
                                                <img src={c.file} width="100%" height="auto" />
                                            </div>
                                            <div className='ProductItem'>
                                                <h3>{c.product_name}</h3>
                                                <p className='mb-3'>₹{c.product_price}</p>
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
                                        {/* <div className=' main-border-button mt-4'>
                                            <a >Add Item</a>
                                        </div> */}
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;