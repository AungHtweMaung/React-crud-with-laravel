import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-light border-end" style={{ width: '200px', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
      <div className="p-3">
        <h2 className="h4">Blog App</h2>
        <nav className="nav nav-pills flex-column">
          <NavLink className="nav-link" to="/" end>Home</NavLink>
          <NavLink className="nav-link" to="/todos" end>Todo</NavLink>
          <NavLink className="nav-link" to="/blogs">Blog</NavLink>
        </nav>
      </div>
    </div>
  );
}
