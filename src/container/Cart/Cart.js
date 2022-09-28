import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, deletecart, increment } from '../../Redux/Action/Cart.action';
import { getProduct } from '../../Redux/Action/product.action';

function Cart(props) {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product);
    const cartProducts = useSelector(state => state.cart);
    const productsData = products.product;
    const cartProductsData = cartProducts.cart;
    console.log(cartProductsData , productsData);
    
    const cartData = [];
    productsData.map((p) => {
        cartProductsData.map((c) => {
            if (p.id === c.e) {
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
                    {
                        cartData.map((c) => (
                            <>
                                <div className='col-lg-12'>
                                    <div className="section-heading">
                                        <h2>Our Latest Category</h2>
                                    </div>

                                    <div className='AddCartBox'>
                                        <div className='CartProductDetails'>
                                            <div className='productImg' style={{height: "112px", width: "112px", overflow: "hidden"}}>
                                                <img src={c.file} width="100%" height="auto"  />
                                            </div>
                                        <div className='ProductItem'>
                                            <h3>{c.product_name}</h3>
                                            <p className='mb-3'>₹{c.product_price}</p>
                                            <div className='items'>
                                                <button disabled={c.quantity === 1 && true} onClick={() => handleDecrement(c.e)}>-</button>
                                                <div className='input'>
                                                    <input type="text" value={c.quantity} />
                                                </div>
                                                <button onClick={() => handleIncrement(c.e)}>+</button>
                                            </div>
                                        </div>
                                        <div className='main-border-button mt-4' >
                                            <div className='deleteItem' onClick={() => handleDelete(c.e)}>REMOVE</div>
                                        </div>
                                    </div>
                                    <div className=' main-border-button mt-4'>
                                        <a >Add Item</a>
                                    </div>
                        </div>
                    </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>

    );
}
export default Cart;