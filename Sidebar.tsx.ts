import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Import icons
import {
  Dashboard,
  Database,
  Calendar,
  Layers,
  FileText,
  Settings,
  ChevronRight,
  ChevronLeft,
} from 'react-feather';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <Dashboard size={20} />,
      exact: true,
    },
    {
      name: 'Templates',
      path: '/templates',
      icon: <FileText size={20} />,
    },
    {
      name: 'Generate Data',
      path: '/generate',
      icon: <Database size={20} />,
    },
    {
      name: 'Schedules',
      path: '/schedules',
      icon: <Calendar size={20} />,
    },
    {
      name: 'Batch Generation',
      path: '/batch',
      icon: <Layers size={20} />,
    },
    {
      name: 'PDF Analysis',
      path: '/pdf-analysis',
      icon: <FileText size={20} />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
    },
  ];

  const toggleGroup = (groupName: string) => {
    setActiveGroup(activeGroup === groupName ? null : groupName);
  };

  const sidebarClass = collapsed ? 'jpm-sidebar jpm-sidebar-collapsed' : 'jpm-sidebar';

  return (
    <div className={sidebarClass}>
      <div className="jpm-sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </div>
      
      <div className="jpm-sidebar-header">
        <div className="jpm-sidebar-logo">
          <img src="/assets/images/jpm-logo.svg" alt="JPM Test Data Generator" />
          {!collapsed && <span>Test Data Generator</span>}
        </div>
      </div>
      
      <div className="jpm-sidebar-content">
        <nav className="jpm-sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? 'jpm-sidebar-nav-link jpm-sidebar-nav-link-active' : 'jpm-sidebar-nav-link'
                  }
                  end={item.exact}
                >
                  <span className="jpm-sidebar-nav-icon">{item.icon}</span>
                  {!collapsed && <span className="jpm-sidebar-nav-text">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="jpm-sidebar-footer">
        {!collapsed && (
          <div className="jpm-sidebar-footer-text">
            <small>© 2025 Your Company</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
