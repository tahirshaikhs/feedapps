// App.js
import React, { useState,useEffect } from 'react';
import './App.css';

import Welcome from './component/Welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './component/Login';
import RegisterPage from './component/Register';
import ViewMypost from './component/ViewMyPost';
import Admin from './component/admin';
import userData from './component/user.json';
import Registeruser from './component/Registeruser';
import Loginuser from './component/Loginuser';
import Createpost from './component/Createpost';
import Adminuser from './component/Adminuser';
import Viewotherpost from './component/Viewotherpostuser';
import Viewmypostuser from './component/Viewmypostuser';
import TableAdmin from './component/Tableadmin';
import Viewotherhide from './component/viewposthide';
import SameAdmin from './component/updateadminidonsame';
import RegisterTest from './component/Registertest';
import CustomNavbar from './component/Navbar';
import LoginMain from './component/LoginMain';
import Approve from './userpost/Approve';
import Alluser from './userpost/Alluser';


const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  
  return (
    
    <div className="App">
       
       
    <Router>
        <Routes>
     

          {/* <Route path="/" element={<RegisterPage />} /> */}
          <Route path="/" element={<RegisterTest />} />
          {/* <Route path="/admin" element={<Adminuser />} /> */}
          <Route path="/admin" element={<TableAdmin />} />
          <Route path="/welcome" element={<Createpost />} />
          <Route path="/Viewotherpost" element={<Viewotherhide />} />
          {/* <Route path="/Viewhide" element={<Viewotherhide />} /> */}
          <Route path="/viewmypost" element={<Viewmypostuser />} />
          <Route path="/table" element={<SameAdmin />} />
          <Route path="/Viewhide" element={<Viewotherhide />} />
          
          <Route path="/login" element={!loggedIn ? <Loginuser setLoggedIn={setLoggedIn} /> : <Welcome />} />
          {/* <Route path="/login" element={!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Admin />} /> */}
          

          {/* userpost */}
          <Route path="/Approve" element={<Alluser />} />

   </Routes>
 </Router>
    
    
   

 </div>
    
  );
};

export default App;
