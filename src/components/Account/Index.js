import React from 'react';

import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link
}from "react-router-dom";
import App from './App';
import Update from './Member/Update';
import Add from './Product/Add';
import ShowProduct from './Product/ShowProduct';
import EditProduct from './Product/EditProduct';

function Index(){
   return(
        <App>
            <Routes>
                 <Route  path="/update" element={<Update/>} />
                 <Route  path="/add" element={<Add/>} />
                 <Route  path="/showproduct" element={<ShowProduct/>} />
                 <Route  path="/editproduct/:id" element={<EditProduct/>} />
                 
            </Routes>
        </App>
   )
}
export default Index;