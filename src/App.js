import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './container/Home/Home';
import About from './container/About/About';
import Contact from './container/Contact/Contact';
import Products from './container/Products/Products';
import Single_Product from './container/Single_Product/Single_Product';
import Login from './container/Login/Login';
import Category from './container/Category/Category';
import Catag_admin from './adminpanel/container/Categ_admin';
import { Provider } from 'react-redux';
import { counterStore } from "./Redux/Store";
import { PersistGate } from 'redux-persist/integration/react'
import Product_admin from "./adminpanel/container/Product_admin";

function App() {

  let { store, persistor } = counterStore()

  return (
    <>
      <Header />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/about"} component={About} />
            <Route exact path={"/contact"} component={Contact} />
            <Route exact path={"/catag_admin"} component={Catag_admin} />
            <Route exact path={"/product_admin"} component={Product_admin} />
            <Route exact path={"/products"} component={Products} />
            <Route exact path={"/category"} component={Category} />
            <Route exact path={"/single-product"} component={Single_Product} />
            <Route exact path={"/login"} component={Login} />
          </Switch>
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
