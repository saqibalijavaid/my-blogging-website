import React, { useState, useEffect } from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import OurStory from "./pages/OurStory";
import UserDetail from "./pages/UserDetails";
import AllBlogs from "./components/blogs/AllBlogs";
import BlogDetails from "./components/blogs/BlogDetails";
import UserBlogs from "./components/blogs/UserBlogs";
import CreateBlog from "./components/blogs/CreateBlog";
import EditBlog from "./components/blogs/EditBlog";
import DeleteBlog from "./components/blogs/DeleteBlog";

const App = () => {
  const [users, setUsers] = useState([]); // Store registered users
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [loggedInUser, setLoggedInUser] = useState(null); // Store logged-in user
  const [userBlogs, setUserBlogs] = useState([]); // Store user-created blogs

  // Load stored data on first render
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const storedBlogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
    setUserBlogs(storedBlogs);
  }, []);

  // Function to handle login
  const handleLogin = (user) => {
    setLoggedInUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

const handleLogout = async () => {
  try {
    // 🔐 Request backend to clear session
    const response = await fetch("http://localhost:5000/api/signout", {
      method: "POST",
      credentials: "include", // Include session cookies
    });

    const data = await response.json();
    console.log("✅ Logout response:", data);

    if (response.ok) {
      // Clear frontend state only
      setLoggedInUser(null);
      setIsLoggedIn(false);

      alert(data.message || "Logged out successfully!");
    } else {
      console.error("❌ Logout failed:", data.message);
      alert(data.message || "Logout failed.");
    }
  } catch (error) {
    console.error("🚨 Error during logout:", error);
    alert("Something went wrong during logout.");
  }
};


  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        user={loggedInUser}
        handleLogout={handleLogout}
      />

      <Layout>
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route
            path="/signin"
            element={<Signin handleLogin={handleLogin} />}
          />
          <Route path="/signup" element={<Signup setUsers={setUsers} />} />
          <Route path="/our-story" element={<OurStory />} /> // ✅ Add OurStory
          {/* Protected Routes (Require Login) */}
          <Route
            path="/user-details"
            element={
              isLoggedIn ? (
                <UserDetail user={loggedInUser} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/my-blogs"
            element={
              isLoggedIn ? (
                <UserBlogs user={loggedInUser} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/create-blog"
            element={
              isLoggedIn ? (
                <CreateBlog user={loggedInUser} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/edit-blog/:id"
            element={
              isLoggedIn ? (
                <EditBlog user={loggedInUser} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/delete-blog/:id"
            element={
              isLoggedIn ? (
                <DeleteBlog user={loggedInUser} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          {/* Redirect Unknown Routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>

      <Footer />
    </Router>
  );
};

export default App;
