import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcartaction } from '../../Redux/Action/Cart.action';
import { decrement, increment } from '../../Redux/Action/Counter.action';
import { getProduct } from '../../Redux/Action/product.action';

function Cart(props) {

    const cartdata = useSelector(state => state.cart)
    const cart = cartdata.cart

    const productdata = useSelector(state => state.product)
    const product = productdata.product

    const counter = useSelector(state => state.counter)
    const productfilter = []

    cart.map(c => (product.map((p) => {
        if (p.id === c.id) {
            productfilter.push(p)
        }
        console.log(p.id);
    })))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
        dispatch(getcartaction())
    }, [])


    const handleincrement = () => {
        dispatch(increment())
    }

    const handledecrement = () => {
        dispatch(decrement())
    }

    return (
        <>
            <section>
                <div className='container'>
                    <div>
                        <h2>Your Cart</h2>
                    </div>
                    <div>
                        <table>
                            {
                                productfilter.map((C) => (
                                    <tbody>
                                        <tr>
                                            <td>
                                            <div className="img-box">
                                                <img src={C.file} />
                                            </div>
                                            
                                            </td>
                                            <td className="">
                                                <a href="">{C.product_name}</a>
                                            </td>
                                            <td className="">
                                                <span className="">${C.product_price}</span>
                                            </td>
                                            <td className="">
                                                <div className="text-center">
                                                    <div className='d-flex'>
                                                        <button onClick={() => handleincrement(C.id)}>+</button>
                                                        {C.id === counter.id ?
                                                            <p>{counter.counter}</p> : 1
                                                        }
                                                        <button onClick={() => handledecrement(C.id)}>-</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Cart;   