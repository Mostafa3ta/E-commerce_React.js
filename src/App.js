import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import { PreventLogin, ProtectedRoute } from './components';
import { Cart, Categories, CategoryDetails, Favourite, Home, Login, NotFound, ProductDetails, Products, Register, SearchDisplay } from './pages';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals } from './redux/CartSlice';

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useMemo(() => dispatch(getTotals()), [cart, dispatch])

  const routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'categorydetails/:category', element: <ProtectedRoute><CategoryDetails /> </ProtectedRoute> },
        { path: 'favourite', element: <ProtectedRoute><Favourite /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'searchproduct', element: <ProtectedRoute><SearchDisplay /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
        { path: 'login', element: <PreventLogin><Login /></PreventLogin> },
        { path: 'register', element: <PreventLogin><Register /></PreventLogin> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])
  return (<>
    <RouterProvider router={routers}></RouterProvider>
  </>)
}

export default App;
