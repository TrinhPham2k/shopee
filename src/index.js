import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import App from './App'

import Index from './components/Blog/Index'
import Detail from './components/Blog/Detail'
import Login from './components/Account/Login'
import Register from './components/Account/Register'
import Home from './Home'
import Account from './components/Account/Index'

import reportWebVitals from './reportWebVitals'
import ProductList from './components/Product/ProductList'
import ProductDetail from './components/Product/ProductDetail'
import CartList from './components/Cart/CartList'
import CartWishList from './components/Cart/CartWishList'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/list" element={<Index />} />
          <Route path="/blog/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
         
          <Route path="/account/*" element={<Account />} />

          <Route path="/productlist" element={<ProductList />} />
          <Route path="/product/detail/:id" element={<ProductDetail />} />

          <Route path="/cartlist" element={<CartList />} />
          <Route path="/cartwishlist" element={<CartWishList />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
