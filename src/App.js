import React, { useEffect } from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
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
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFoundPage from './pages/PageNotFoundPage';
import OrderSuccesspage from './pages/OrderSuccesspage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { LogOutPage } from './pages/LogOutPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProtected from './features/auth/components/AdminProtected';
import { AdminHomePage } from './pages/AdminHomePage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ShimmerOrder from './features/shimmer/ShimmerOrder';
import StripeCheckout from './pages/StripeCheckout';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

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
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHomePage></AdminHomePage>
      </AdminProtected>
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
    path: "/logout",
    element:(
      <LogOutPage></LogOutPage>
    )
  },
  {
    path: "/forgot-password",
    element:(
      <ForgotPasswordPage></ForgotPasswordPage>
    )
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
    path: "/user/product-detail/:id",
    element:(
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element:(
      <AdminProtected>
        <AdminProductDetailPage></AdminProductDetailPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form",
    element:(
      <AdminProtected>
        <AdminProductFormPage></AdminProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/orders",
    element:(
      <AdminProtected>
        <AdminOrdersPage></AdminOrdersPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element:(
      <AdminProtected>
        <AdminProductFormPage></AdminProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/order-success/:id",
    element:(
      <OrderSuccesspage></OrderSuccesspage>
    ),
  },
  {
    path: "/order-details",
    element:(
      <OrderDetailsPage></OrderDetailsPage>
    )
  },
  {
    path: "/user-profile",
    element:(
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    )
  },
  {
    path: "/stripe-checkout",
    element:(
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    )
  },
  {
    path: "/shimmer",
    element:(
      <ShimmerOrder></ShimmerOrder>        //TODO: cleanup
    )
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
  const userChecked = useSelector(selectUserChecked)
  useEffect(() => {
    dispatch(checkAuthAsync())
  },[dispatch]);
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync())// we can get req.user by token on backend so no need of passing id's
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user])
  
  // const options = {
  //   timeout: 5000,
  //   position: positions.BOTTOM_CENTER
  // };


  return (
    <div className="App">
        {userChecked && <Provider template={AlertTemplate} {...options}>
              <RouterProvider router={router} />
        </Provider>}
    </div>
  );
} 

export default App;
