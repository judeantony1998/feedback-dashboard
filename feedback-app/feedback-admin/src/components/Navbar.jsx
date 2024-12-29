import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <Link to="/" style={{ marginRight: '20px', color: 'white' }}>Dashboard</Link>
      <Link to="/add-feedback" style={{ color: 'white' }}>Add Feedback</Link>
    </nav>
  );
};

export default Navbar;
