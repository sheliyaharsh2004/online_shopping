import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doctordata } from '../../Redux/Action/doctor.action';
import { getProduct } from '../../Redux/Action/product.action';
import { useHistory } from 'react-router-dom';
import { addcartaction } from '../../Redux/Action/Cart.action';

function Products(props) {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [filterDataPro , setFilterDataPro] = useState([]);

    const categ = useSelector(state => state.doctor);
    const product = useSelector(state => state.product);
    const productdata = product.product ;
    const dispatch = useDispatch()
    const history = useHistory();

    const handleCatagory = (c) => {
        console.log();
        const filter = [];
        if (c === "All") {
            setFilterDataPro([])
        }
       productdata.filter((f) =>{
           console.log(f.product_list);
            if (c === f.product_list) {
                filter.push(f);     
            }
        })
        setFilterDataPro(filter)
    };
    const finalpr = filterDataPro.length > 0 ? filterDataPro : productdata;

    const hendleCart = (e) => {
        const CartData = {
            e,quantity
        }
        dispatch(addcartaction(CartData))
        history.push('Cart', CartData)
    }

    const hendleDeails = (f) => {
      history.push("/ProductDetails", f)
    }

    useEffect(() => {
        dispatch(doctordata());
        dispatch(getProduct())
    }, [])

    return (
        <div>
            <div className="page-heading" id="top">
                <div className="container_fuild">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-content">
                                <h2>Products</h2>
                                <span>Awesome &amp; Creative HTML CSS layout by TemplateMo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section" id="products">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h2>Our Latest Products</h2>
                                <span>Check out all of our products.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='catagory-view'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="item">
                                <div className='cat-view-box'>
                                    <div className='category_name'>
                                    <a  onClick={(e) => handleCatagory("All")}>All</a>
                                    </div>
                                    {
                                        categ.doctor.map((c) => {
                                            return (
                                                <div onClick={(e) => handleCatagory(c.id)} className='category_name'>
                                                {c.categ_name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="product_section layout_padding">
                <div className="container">
                    <div className="inner-content">
                        <h2>
                            Our<span>products</span>
                        </h2>
                    </div>
                    <div className="row">
                        {
                           finalpr.map((e) => (
                                <div className="col-sm-4 mt-4 mb-4 box">
                                    <div className="img-box">
                                        <img src={e.file} />
                                    </div>
                                    <div className="detail-box">
                                        <div className='productbox'>
                                            <h4 className='name mt-2'>{e.product_name}</h4>
                                            <div className='price'>Price : {e.product_price}</div>
                                            {/* <p className='pro-list'>Catagory : {e.product_list}</p> */}
                                            {/* <p className='description-pro'>{e.product_description}</p> */}
                                        </div>
                                    </div>
                                    <div className="button">
                                        <div className="total">
                                                <div className="main-border-button mt-3" type="button">
                                                    <a onClick={() => hendleCart(e.id)}>Add To Cart</a>
                                                    <a className='ml-4' onClick={() => hendleDeails(e)}>Read More</a>
                                                </div>
                                                <div className="main-border-button" type="button">
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Products;