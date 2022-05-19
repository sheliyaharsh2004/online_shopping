import logo from './logo.svg';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './container/Home/Home';
import About from './container/About/About';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/about"} component={About} />
        <Route exact path={"/contact"} component={About} />
        <Route exact path={"/about"} component={About} />
      </Switch>
      {/* <Home /> */}
      <Footer />
    </>
  );
}

export default App;
