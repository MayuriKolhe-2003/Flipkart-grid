import React from "react";
import { Switch, Route } from "react-router-dom";
import { isDesktop} from 'react-device-detect';
//Custom import
import Header from "./components/header/Header";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import MyAccountsPage from "./pages/MyAccountsPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderFailedPage from "./pages/OrderFailedPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import monitorImg from './assets/monitors-laptop.png';
import Supercoin from "./components/supercoin/Supercoin";

//css
import "./App.css";
import SpinWheel from "./components/supercoin/SpinWheel";
import CoinsActivity from "./components/supercoin/CoinsActivity";


function App() { 
  return (
    <div className="app">
      {isDesktop ? (
        <>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <AuthPage />
            </Route>
            <Route exact path="/cart">
              <CartPage />
            </Route>
            <Route exact path="/account">
              <MyAccountsPage />
            </Route>
            <Route exact path="/wishlist">
              <MyAccountsPage />
            </Route>
            <Route exact path="/account/addresses">
              <MyAccountsPage />
            </Route>
            <Route exact path="/orders">
              <OrdersPage />
            </Route>
            <Route exact path="/checkout">
              <CheckoutPage />
            </Route>
            <Route exact path="/product/:id">
              <ProductPage />
            </Route>
            <Route exact path="/order-failed">
              <OrderFailedPage />
            </Route>
            <Route exact path="/order-success">
              <OrderSuccessPage />
            </Route>
            <Route exact path="/supercoin">
              <Supercoin />
            </Route>
            <Route exact path='/spinwheel'>
              <SpinWheel />
            </Route>
            <Route exact path='/coins-activity'>
              <CoinsActivity />
            </Route>
           
            <Route component={ErrorPage} />
          </Switch>
        </>
      ) : (
        <div className="container">
          <img className="img" src={monitorImg} alt="Mobile Laptop" />
          <div className="text-container">
            <h2 className="heading">Please use Laptop or desktop</h2>
            <p className="para">
              We don't support small screen yet. Please use laptop or desktop for the
              best experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
