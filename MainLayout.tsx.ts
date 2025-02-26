import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 992);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobileView(mobile);
      
      // Close sidebar on mobile view
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    if (isMobileView) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const sidebarClass = isMobileView
    ? `jpm-sidebar ${mobileMenuOpen ? 'jpm-sidebar-mobile-open' : ''}`
    : `jpm-sidebar ${sidebarCollapsed ? 'jpm-sidebar-collapsed' : ''}`;

  const mainClass = isMobileView
    ? 'jpm-main-content'
    : `jpm-main-content ${sidebarCollapsed ? 'jpm-main-content-expanded' : ''}`;

  return (
    <div className="jpm-app-container">
      {isMobileView && mobileMenuOpen && (
        <div
          className="jpm-sidebar-overlay active"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      
      <div className={mainClass}>
        <Header
          toggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <main className="jpm-page-content">
          <div className="jpm-page-container">
            <Outlet />
          </div>
        </main>
        
        <footer className="jpm-footer">
          <div className="jpm-footer-content">
            <p>© 2025 Your Company. All rights reserved.</p>
            <p>Test Data Generator v1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
