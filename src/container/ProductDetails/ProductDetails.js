import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';
import { useDispatch } from 'react-redux';
import { AddcartAction } from '../../Redux/Action/Cart.action';
import { useHistory } from 'react-router-dom';

function ProductDetails(props) {

    const ProductDetail = [props.location.state];
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const history = useHistory();

    const hendleCart = (e) => {
        const CartData = {
            e,quantity
        }
        dispatch(AddcartAction(CartData))
        history.push('/CartDetails')
    }


    return (
        <div className='product_details'>
            <div className='container'>
                <div className="row">
                    {
                        ProductDetail.map((p) => (
                            <>
                                <div className="col-lg-6 col-sm-12">
                                    <div className='product_img mt-5'>
                                        <img src={p.file} />
                                    </div>  
                                </div>
                                <div className="col-lg-6 col-sm-12 mt-5">
                                    <h2>{p.product_name}</h2>
                                    <p className='price'><span><b>Price :</b></span> ₹{p.product_price}</p>
                                    <div className='d-flex description-pro'>
                                        <b></b>
                                        <span className='m-0'>{p.product_description}</span>
                                    </div>
                                    <div className='button'>
                                        <div className='total'>
                                            <div className='main-border-button mt-4' type='button'>
                                                <a onClick={() => hendleCart(p.id)}><ShoppingCartIcon />Add to cart</a>
                                                <a className='ml-4'><BoltIcon />Buy now</a>
                                            </div> 
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

export default ProductDetails;