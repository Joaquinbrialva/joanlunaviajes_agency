import React from 'react';
import '../styles/Sidebar2.css'

const Sidebar2 = () => {
  return (
    <div className="card">
      <ul className="card-list">
        <li>
          <button className="card-button">
            {/* Dashboard icon */}
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h5v8H3v-8zm7 0h11v8H10v-8z" />
            </svg>
            Dashboard
          </button>
        </li>

        <li>
          <button className="card-button">
            {/* Settings icon */}
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.43 12.98l1.77-1.02a8.1 8.1 0 000-1.92l-1.77-1.02-.4-1.9a7.987 7.987 0 00-1.51-2.6l-1.9-.4-1.02-1.77a8.1 8.1 0 00-1.92 0L9.98 3.57l-1.9.4a7.987 7.987 0 00-2.6 1.51l-.4 1.9L3.3 8.38a8.1 8.1 0 000 1.92l1.77 1.02.4 1.9a7.987 7.987 0 001.51 2.6l1.9.4 1.02 1.77a8.1 8.1 0 001.92 0l1.02-1.77 1.9-.4a7.987 7.987 0 002.6-1.51l.4-1.9zM12 15.6A3.6 3.6 0 1115.6 12 3.6 3.6 0 0112 15.6z" />
            </svg>
            Settings
          </button>
        </li>

        <li>
          <button className="card-button">
            {/* Logout icon */}
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
            </svg>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar2;
