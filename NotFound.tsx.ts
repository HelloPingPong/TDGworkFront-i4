import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'react-feather';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <AlertCircle size={64} />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="jpm-button jpm-button-primary">
          <Home size={16} className="mr-2" /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
