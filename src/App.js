import logo from './logo.svg';
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

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/about"} component={About} />
        <Route exact path={"/contact"} component={Contact} />
        <Route exact path={"/products"} component={Products} />
        <Route exact path={"/single-product"} component={Single_Product} />
        <Route exact path={"/login"} component={Login} />
      </Switch>
      {/* <Home /> */}
      <Footer />
    </>
  );
}

export default App;
