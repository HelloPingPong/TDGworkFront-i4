import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, User, Search } from 'react-feather';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  const location = useLocation();
  
  // Map routes to page titles
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/templates')) return 'Templates';
    if (path.startsWith('/generate')) return 'Generate Data';
    if (path.startsWith('/schedules')) return 'Schedules';
    if (path.startsWith('/batch')) return 'Batch Generation';
    if (path.startsWith('/pdf-analysis')) return 'PDF Analysis';
    if (path.startsWith('/settings')) return 'Settings';
    
    return 'Test Data Generator';
  };

  return (
    <header className="jpm-header">
      <div className="jpm-header-start">
        <button
          className="jpm-header-menu-button"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        
        <h1 className="jpm-header-title">{getPageTitle()}</h1>
      </div>
      
      <div className="jpm-header-search">
        <div className="jpm-search-container">
          <Search size={16} className="jpm-search-icon" />
          <input
            type="text"
            className="jpm-search-input"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>
      </div>
      
      <div className="jpm-header-end">
        <button className="jpm-header-icon-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="jpm-header-notification-badge">2</span>
        </button>
        
        <div className="jpm-header-user">
          <div className="jpm-header-user-avatar">
            <User size={20} />
          </div>
          <span className="jpm-header-user-name">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
