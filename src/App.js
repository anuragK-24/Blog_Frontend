import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import MarkDown from "./pages/markDown/MarkDown";
import Contact from "./components/Contact/Contact";
import Footer from "./components/footer/Footer";

// In react-router-dom v6, "Switch" is replaced by routes "Routes". You need to update the import from

function App() {
  const {user} = useContext(Context) ;
  return (
    <Router>
      <TopBar/> 
      
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/register" element={user ? <Home/> :<Register/>}/>

        <Route path="/login" element={user ? <Home/> : <Login/>}/>

        <Route path="/write" element={user ? <Write/> : <Register/> }/>

        <Route path="/markdown" element={<MarkDown/>}/>

        <Route path="/contact" element={<Contact/>  }/>

        <Route path="/post/:postID" element={<Single/>}/>

      </Routes>
      <Footer/>
    </Router>
   );
}
  
export default App;
