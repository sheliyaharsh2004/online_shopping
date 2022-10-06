import React from 'react';
import Tabs from '../ProductTab/Tabs';

function ListProduct(props) {
    return (
        <div className="contact_section layout_padding">
            <div className="container">
                <h1 className="touch_taital">Add Product</h1>
                <Tabs/>
            </div>
        </div>
    );
}

export default ListProduct;