import React from 'react';
import { Link } from 'react-router-dom';

// Navbar component receives a function `openCreateModal` as a prop
const Navbar = ({ openCreateModal }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" to="/">User Management</Link>
      <div style={{ marginLeft: 'auto' }}>
        <button className="btn btn-primary" onClick={openCreateModal}>
          Create User
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
