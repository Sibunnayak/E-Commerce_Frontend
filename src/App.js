import './App.css';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import * as React from "react";
import ProductDetailPage from './pages/ProductDetailPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from './features/auth/componants/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import { useEffect } from 'react';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrderPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
    </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  { 
    path: '/product-detail/:id',
    element: <Protected> <ProductDetailPage></ProductDetailPage></Protected>,
  },
  { 
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
  { 
    path: '/order-success/:id',
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  { 
    path: '/orders',
    element: <UserOrdersPage></UserOrdersPage>,
  },
]);

function App() {
const dispatch = useDispatch();
const user = useSelector(selectLoggedInUser)

useEffect(()=>{
  if(user){
 dispatch(fetchItemsByUserIdAsync(user.id));
  }
},[dispatch,user])

  return (
    <div className="App">
      {/* <Counter></Counter> */}
    {/* <Home></Home> */}
    {/* <LoginPage></LoginPage> */}
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
