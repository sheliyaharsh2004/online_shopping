import React from 'react';
import Tab from '../ProductTab/Tab';
import * as yup from 'yup';
import { useFormik } from 'formik';

function AddProduct(props) {

    let schema = yup.object().shape({
        p_name: yup.string().required(),
        p_price: yup.string().required(),
        p_size: yup.string().required(),
      });

      const formik = useFormik({
        initialValues: {
          p_name: '',
          p_price: '',
          p_size: '',
        },
        validationSchema: schema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });



    return (
        <div className="contact_section layout_padding">
            <div className="container">
                <h1 className="touch_taital">Add Product</h1>
                <Tab/>

                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="firstName">Product Name</label>
                    <input
                        id="p_name"
                        name="p_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    <label htmlFor="lastName">Price</label>
                    <input
                        id="p_price"
                        name="p_price"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    <label htmlFor="email">Size</label>
                    <input
                        id="p_size"
                        name="p_size"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;