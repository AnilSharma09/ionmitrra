import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import ProductId from './pages/ProductId'





export const App = () => {
  return (
    
    
    
    
    <Routes>
  <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/> 
        <Route path="/products" element={<Products/>}/> 
        <Route path="/cart" element={<Cart/>}/> 
        <Route path="/product-details" element={<ProductDetails/>}/> 
        <Route path="/product-details" element={<ProductDetails/>}/>
        <Route path="/products/:productId" element={<ProductId/>}/>
   
  </Route>
</Routes>


  )
}
