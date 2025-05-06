// Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="pt-20"> {/* This matches the navbar height */}
        {children}
      </div>
    </div>
  );
};

export default Layout;