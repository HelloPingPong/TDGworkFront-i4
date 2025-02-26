import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Database, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Layers
} from 'react-feather';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './Dashboard.css';

interface StatCard {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  link: string;
}

interface ActivityItem {
  id: number;
  type: 'template' | 'generation' | 'schedule';
  action: string;
  name: string;
  timestamp: string;
  status?: 'success' | 'error' | 'pending';
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Templates',
      count: 12,
      icon: <FileText />,
      color: 'var(--jpm-primary)',
      link: '/templates'
    },
    {
      title: 'Generations',
      count: 86,
      icon: <Database />,
      color: 'var(--jpm-accent)',
      link: '/generate'
    },
    {
      title: 'Schedules',
      count: 5,
      icon: <Calendar />,
      color: 'var(--jpm-warning)',
      link: '/schedules'
    },
    {
      title: 'Batch Jobs',
      count: 3,
      icon: <Layers />,
      color: 'var(--jpm-info)',
      link: '/batch'
    }
  ]);

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([
    {
      id: 1,
      type: 'generation',
      action: 'Generated',
      name: 'Monthly Invoice Data',
      timestamp: 'Just now',
      status: 'success'
    },
    {
      id: 2,
      type: 'template',
      action: 'Created',
      name: 'Customer Contact Info',
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      type: 'schedule',
      action: 'Updated',
      name: 'Weekly Data Refresh',
      timestamp: '3 hours ago'
    },
    {
      id: 4,
      type: 'generation',
      action: 'Generated',
      name: 'Loan Applications',
      timestamp: 'Yesterday',
      status: 'error'
    },
    {
      id: 5,
      type: 'template',
      action: 'Modified',
      name: 'Bankruptcy Notice',
      timestamp: 'Yesterday'
    }
  ]);

  const [upcomingSchedules, setUpcomingSchedules] = useState([
    {
      id: 1,
      name: 'Daily Transaction Data',
      nextRun: 'Today, 6:00 PM',
      template: 'Transaction Records'
    },
    {
      id: 2,
      name: 'Weekly Data Refresh',
      nextRun: 'Tomorrow, 3:00 AM',
      template: 'Customer Database'
    },
    {
      id: 3,
      name: 'Monthly Report Data',
      nextRun: 'May 1, 8:00 AM',
      template: 'Monthly Report'
    }
  ]);

  // Get status icon based on activity status
  const getStatusIcon = (status?: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="activity-status-icon success" />;
      case 'error':
        return <AlertCircle size={16} className="activity-status-icon error" />;
      case 'pending':
        return <RefreshCw size={16} className="activity-status-icon pending" />;
      default:
        return null;
    }
  };

  // Get icon for activity type
  const getActivityIcon = (type: 'template' | 'generation' | 'schedule') => {
    switch (type) {
      case 'template':
        return <FileText size={16} />;
      case 'generation':
        return <Database size={16} />;
      case 'schedule':
        return <Calendar size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="jpm-page-title">Dashboard</h1>
      <p className="jpm-page-subtitle">Welcome to Test Data Generator</p>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <Card key={index} className="dashboard-stat-card">
            <div className="stat-card-content">
              <div className="stat-card-icon" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-card-info">
                <h3 className="stat-card-count">{stat.count}</h3>
                <p className="stat-card-title">{stat.title}</p>
              </div>
            </div>
            <Link to={stat.link} className="stat-card-link">
              View Details <ArrowRight size={16} />
            </Link>
          </Card>
        ))}
      </div>

      <div className="dashboard-main-content">
        {/* Recent Activity */}
        <div className="dashboard-section recent-activity">
          <Card>
            <Card.Header>
              <h2 className="dashboard-section-title">Recent Activity</h2>
            </Card.Header>
            <Card.Body>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-details">
                      <div className="activity-header">
                        <span className="activity-name">
                          {activity.action} <strong>{activity.name}</strong>
                        </span>
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="activity-time">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dashboard-section-footer">
                <Button variant="text" size="sm" rightIcon={<ArrowRight size={16} />}>
                  View All Activity
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Upcoming Schedules */}
        <div className="dashboard-section upcoming-schedules">
          <Card>
            <Card.Header>
              <h2 className="dashboard-section-title">Upcoming Schedules</h2>
            </Card.Header>
            <Card.Body>
              <div className="schedule-list">
                {upcomingSchedules.map((schedule) => (
                  <div key={schedule.id} className="schedule-item">
                    <div className="schedule-icon">
                      <Clock size={16} />
                    </div>
                    <div className="schedule-details">
                      <div className="schedule-name">{schedule.name}</div>
                      <div className="schedule-info">
                        <span className="schedule-template">{schedule.template}</span>
                        <span className="schedule-time">{schedule.nextRun}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dashboard-section-footer">
                <Link to="/schedules">
                  <Button variant="text" size="sm" rightIcon={<ArrowRight size={16} />}>
                    Manage Schedules
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section quick-actions">
        <Card>
          <Card.Header>
            <h2 className="dashboard-section-title">Quick Actions</h2>
          </Card.Header>
          <Card.Body>
            <div className="quick-actions-grid">
              <Link to="/templates/new" className="quick-action-link">
                <div className="quick-action-item">
                  <div className="quick-action-icon">
                    <FileText size={24} />
                  </div>
                  <div className="quick-action-text">Create Template</div>
                </div>
              </Link>
              <Link to="/generate" className="quick-action-link">
                <div className="quick-action-item">
                  <div className="quick-action-icon">
                    <Database size={24} />
                  </div>
                  <div className="quick-action-text">Generate Data</div>
                </div>
              </Link>
              <Link to="/schedules/new" className="quick-action-link">
                <div className="quick-action-item">
                  <div className="quick-action-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="quick-action-text">Schedule Generation</div>
                </div>
              </Link>
              <Link to="/pdf-analysis" className="quick-action-link">
                <div className="quick-action-item">
                  <div className="quick-action-icon">
                    <FileText size={24} />
                  </div>
                  <div className="quick-action-text">Analyze PDF</div>
                </div>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
