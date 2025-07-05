import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ParallaxProvider } from "react-scroll-parallax";

import NavBar from "./components/navbar/NavBar";

import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/register/SignUp";
import About from "./pages/About/About";
import MarkDown from "./pages/markDown/MarkDown";
import LandingPage from "./pages/LandingPage/LandingPage";
import Blogs from "./pages/Blogs/Blogs";

// Wrap Routes inside AppWrapper so we can use useLocation
const AppWrapper = () => {
  const { user } = useContext(Context);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={user ? <Blogs /> : <SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={user ? <Blogs /> : <SignUp />} />
        <Route path="/login" element={user ? <Blogs /> : <SignIn />} />
        <Route path="/write" element={user ? <Write /> : <SignIn />} />
        <Route path="/markdown" element={<MarkDown />} />
        <Route path="/post/:postID" element={<Single />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ParallaxProvider>
        <Router>
          <AppWrapper />
        </Router>
      </ParallaxProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
