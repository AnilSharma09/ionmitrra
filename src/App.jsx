import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'





export const App = () => {
  return (
    
    
    
    
    <Routes>
  <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/> 
        <Route path="/products" element={<Products/>}/> 
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/cart" element={<Cart/>}/> 
        <Route path="/product/:slug" element={<ProductDetails/>}/> 
        
        
   
  </Route>
</Routes>


  )
}
