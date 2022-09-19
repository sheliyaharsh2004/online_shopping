import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doctordata } from '../../Redux/Action/doctor.action';
import { getProduct } from '../../Redux/Action/product.action';

function Products(props) {
    const [open, setOpen] = useState(false);

    const categ = useSelector(state => state.doctor);
    const product = useSelector(state => state.product);

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCatagory = (c) => {
        let search = product.filter((I) => (
            I.id.toString().includes(I) ||
            I.product_list.toString().includes(I)
        ))
    };
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
                                <h2>Progucts</h2>
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
                                <h2>Our Latest Progucts</h2>
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
                                    <a href="#" onClick={(e) => handleCatagory("All")}>All</a>
                                    </div>
                                    {
                                        categ.doctor.map((c) => {
                                            return (
                                                <div className='category_name'>
                                                    <a href="#" onClick={(e) => handleCatagory(c.id)}>{c.categ_name}</a>
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
                            product.product.map((e) => (
                                <div className="col-sm-4 mt-4">
                                    <div className="option_container">
                                        <div className="options">
                                                <button>
                                                    <a href className="">
                                                        Add To Cart
                                                    </a>
                                                </button>
                                                <button> 
                                                    <a href className="">
                                                        Buy Now
                                                    </a>
                                                </button>
                                            </div>
                                        </div>
                                    <div className="img-box">
                                        <img src={e.file} />
                                    </div>
                                    <div className="detail-box">
                                        <div className='productbox'>
                                            <h4 className='name mt-2'>{e.product_name}</h4>
                                            <div className='price'>Price : {e.product_price}</div>
                                            {/* <p className='pro-type'>Catagory : {e.product_list}</p> */}
                                            <p className='description-pro'>{e.product_description}</p>
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