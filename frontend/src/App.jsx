import React, { useState, useEffect } from "react";
import "./App.css";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);

  // 🔐 Check if user is already logged in (session persistence)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setLoggedInUser(data);
          setIsLoggedIn(true);
          console.log("✅ Logged-in user persisted:", data);
        } else {
          setIsLoggedIn(false);
          setLoggedInUser(null);
          console.log("⚠️ No active session");
        }
      } catch (err) {
        console.error("🚨 Error checking session:", err);
        setIsLoggedIn(false);
        setLoggedInUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = (user) => {
    setLoggedInUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      console.log("✅ Logout response:", data);

      if (response.ok) {
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
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/signin" element={<Signin handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup setUsers={setUsers} />} />
          <Route path="/our-story" element={<OurStory />} />

          {/* Protected Routes */}
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

          {/* Catch-All */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>

      <Footer />
    </Router>
  );
};

export default App;
