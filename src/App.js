import React, { useEffect } from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckOutPage from './pages/CheckOutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFoundPage from './pages/PageNotFoundPage';
import OrderSuccesspage from './pages/OrderSuccesspage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage></HomePage>
      </Protected>
      
    ),
  },
  {
    path: "login",
    element:(
      <LoginPage></LoginPage>
    ),
  },
  {
    path: "/signup",
    element:(
      <SignUpPage></SignUpPage>
    ),
  },
  {
    path: "/cart",
    element:(
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element:(
      <Protected>
        <CheckOutPage></CheckOutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element:(
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order-success",
    element:(
      <OrderSuccesspage></OrderSuccesspage>
    ),
  },
  {
    path: "*",
    element:(
      <PageNotFoundPage></PageNotFoundPage>
    ),
  },
]);



function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch,user])


  return (
    <div className="App">
          <RouterProvider router={router} />
    </div>
  );
} 

export default App;
