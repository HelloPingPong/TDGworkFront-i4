import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Play, 
  Pause, 
  Info, 
  Edit, 
  Trash2, 
  RefreshCw, 
  Clock, 
  Calendar,
  FileText,
  Database,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Search
} from 'react-feather';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import './Schedules.css';

interface Template {
  id: number;
  name: string;
}

interface Schedule {
  id: number;
  name: string;
  description: string;
  template: Template;
  status: 'active' | 'paused' | 'completed' | 'error' | 'created';
  type: 'one-time' | 'recurring';
  cronExpression?: string;
  nextRunTime?: string;
  lastRunTime?: string;
  lastRunResult?: string;
  rowCount: number;
  outputFormat: string;
  createdAt: string;
  updatedAt: string;
}

type ScheduleStatus = 'all' | 'active' | 'paused' | 'completed' | 'error' | 'created';
type ScheduleType = 'one-time' | 'recurring';

const SchedulesPage: React.FC = () => {
  // State for schedules list
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus>('all');

  // State for create form
  const [templates, setTemplates] = useState<Template[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    templateId: 0,
    scheduleType: 'one-time' as ScheduleType,
    nextRunTime: '',
    cronExpression: '0 0 * * *', // Daily at midnight
    rowCount: 100,
    outputFormat: 'CSV'
  });
  const [isCreating, setIsCreating] = useState(false);

  // Fetch schedules (mock)
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setSchedules([
        {
          id: 1,
          name: 'Daily Customer Data',
          description: 'Generate fresh customer data every day',
          template: { id: 1, name: 'Customer Data' },
          status: 'active',
          type: 'recurring',
          cronExpression: '0 0 * * *', // Daily at midnight
          nextRunTime: '2025-02-27T00:00:00Z',
          lastRunTime: '2025-02-26T00:00:00Z',
          lastRunResult: 'Successfully generated 100 rows',
          rowCount: 100,
          outputFormat: 'CSV',
          createdAt: '2025-02-01T10:30:00Z',
          updatedAt: '2025-02-26T00:01:00Z'
        },
        {
          id: 2,
          name: 'Weekly Transaction Report',
          description: 'Generate transaction data for weekly reporting',
          template: { id: 3, name: 'Transaction Records' },
          status: 'active',
          type: 'recurring',
          cronExpression: '0 0 * * 1', // Every Monday
          nextRunTime: '2025-03-03T00:00:00Z',
          lastRunTime: '2025-02-24T00:00:00Z',
          lastRunResult: 'Successfully generated 500 rows',
          rowCount: 500,
          outputFormat: 'JSON',
          createdAt: '2025-01-15T14:20:00Z',
          updatedAt: '2025-02-24T00:02:00Z'
        },
        {
          id: 3,
          name: 'Monthly Reporting Data',
          description: 'Generate data for month-end financial reports',
          template: { id: 5, name: 'Monthly Invoice' },
          status: 'paused',
          type: 'recurring',
          cronExpression: '0 0 1 * *', // First day of each month
          nextRunTime: '2025-03-01T00:00:00Z',
          lastRunTime: '2025-02-01T00:00:00Z',
          lastRunResult: 'Successfully generated 200 rows',
          rowCount: 200,
          outputFormat: 'XML',
          createdAt: '2025-01-05T11:45:00Z',
          updatedAt: '2025-02-15T16:30:00Z'
        },
        {
          id: 4,
          name: 'Quarterly Loan Data',
          description: 'Generate loan application data for quarterly review',
          template: { id: 2, name: 'Loan Applications' },
          status: 'completed',
          type: 'one-time',
          nextRunTime: '2025-04-01T09:00:00Z',
          lastRunTime: '2025-01-01T09:00:00Z',
          lastRunResult: 'Successfully generated 300 rows',
          rowCount: 300,
          outputFormat: 'CSV',
          createdAt: '2024-12-15T10:00:00Z',
          updatedAt: '2025-01-01T09:05:00Z'
        },
        {
          id: 5,
          name: 'Data Migration Test',
          description: 'Generate test data for database migration',
          template: { id: 4, name: 'Bankruptcy Notice' },
          status: 'error',
          type: 'one-time',
          nextRunTime: '2025-02-25T15:00:00Z',
          lastRunTime: '2025-02-25T15:00:00Z',
          lastRunResult: 'Error: Template column mismatch',
          rowCount: 1000,
          outputFormat: 'JSON',
          createdAt: '2025-02-24T11:30:00Z',
          updatedAt: '2025-02-25T15:01:00Z'
        }
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  // Fetch templates (mock)
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setTemplates([
        { id: 1, name: 'Customer Data' },
        { id: 2, name: 'Loan Applications' },
        { id: 3, name: 'Transaction Records' },
        { id: 4, name: 'Bankruptcy Notice' },
        { id: 5, name: 'Monthly Invoice' }
      ]);
    }, 500);
  }, []);

  // Filter schedules based on search term and status filter
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch = 
      schedule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.template.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || schedule.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle schedule type selection
  const handleScheduleTypeSelect = (type: ScheduleType) => {
    setFormData({
      ...formData,
      scheduleType: type
    });
  };

  // Handle cron preset selection
  const handleCronPresetSelect = (cronExpression: string) => {
    setFormData({
      ...formData,
      cronExpression
    });
  };

  // Create schedule
  const createSchedule = async () => {
    if (!formData.name) {
      alert('Please enter a schedule name');
      return;
    }

    if (!formData.templateId) {
      alert('Please select a template');
      return;
    }

    if (formData.scheduleType === 'one-time' && !formData.nextRunTime) {
      alert('Please select a run time');
      return;
    }

    setIsCreating(true);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const template = templates.find(t => t.id === Number(formData.templateId));
      
      if (!template) {
        throw new Error('Template not found');
      }
      
      const newSchedule: Schedule = {
        id: Math.max(...schedules.map(s => s.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        template,
        status: 'created',
        type: formData.scheduleType,
        cronExpression: formData.scheduleType === 'recurring' ? formData.cronExpression : undefined,
        nextRunTime: formData.scheduleType === 'one-time' ? formData.nextRunTime : formatNextRunFromCron(formData.cronExpression),
        rowCount: Number(formData.rowCount),
        outputFormat: formData.outputFormat,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setSchedules([...schedules, newSchedule]);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        templateId: 0,
        scheduleType: 'one-time',
        nextRunTime: '',
        cronExpression: '0 0 * * *',
        rowCount: 100,
        outputFormat: 'CSV'
      });
      
      alert('Schedule created successfully');
    } catch (error) {
      console.error('Error creating schedule:', error);
      alert('Failed to create schedule. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Toggle schedule status (active/paused)
  const toggleScheduleStatus = async (scheduleId: number) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSchedules(schedules.map(schedule => {
        if (schedule.id === scheduleId) {
          const newStatus = schedule.status === 'active' ? 'paused' : 'active';
          return {
            ...schedule,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return schedule;
      }));
    } catch (error) {
      console.error('Error toggling schedule status:', error);
      alert('Failed to update schedule status. Please try again.');
    }
  };

  // Delete schedule
  const deleteSchedule = async (scheduleId: number) => {
    if (!confirm('Are you sure you want to delete this schedule?')) {
      return;
    }
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule. Please try again.');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Past due';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays < 7) {
      return `In ${diffDays} days`;
    } else if (diffDays < 30) {
      return `In ${Math.floor(diffDays / 7)} weeks`;
    } else {
      return `In ${Math.floor(diffDays / 30)} months`;
    }
  };

  // Get next run times from cron expression (mock)
  const formatNextRunFromCron = (cronExpression: string) => {
    // This is a simplified mock function for demonstration
    // In a real app, you would use a library like cron-parser
    
    const now = new Date();
    
    // For daily cron (0 0 * * *)
    if (cronExpression === '0 0 * * *') {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow.toISOString();
    }
    
    // For weekly cron (0 0 * * 1) - Monday
    if (cronExpression === '0 0 * * 1') {
      const monday = new Date(now);
      const daysUntilMonday = 1 - now.getDay();
      monday.setDate(monday.getDate() + (daysUntilMonday <= 0 ? daysUntilMonday + 7 : daysUntilMonday));
      monday.setHours(0, 0, 0, 0);
      return monday.toISOString();
    }
    
    // For monthly cron (0 0 1 * *) - 1st of month
    if (cronExpression === '0 0 1 * *') {
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      firstOfMonth.setHours(0, 0, 0, 0);
      return firstOfMonth.toISOString();
    }
    
    // Default: return tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
  };

  // Get next run times based on cron expression
  const getNextRunTimes = (cronExpression: string, count: number = 3) => {
    // This is a simplified mock function for demonstration
    // In a real app, you would use a library like cron-parser
    
    const runs = [];
    let date = new Date();
    
    // For daily cron (0 0 * * *)
    if (cronExpression === '0 0 * * *') {
      for (let i = 0; i < count; i++) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(0, 0, 0, 0);
        runs.push(formatDate(nextDate.toISOString()));
        date = nextDate;
      }
    }
    
    // For weekly cron (0 0 * * 1) - Monday
    else if (cronExpression === '0 0 * * 1') {
      for (let i = 0; i < count; i++) {
        const nextDate = new Date(date);
        const daysUntilMonday = 1 - nextDate.getDay();
        nextDate.setDate(nextDate.getDate() + (daysUntilMonday <= 0 ? daysUntilMonday + 7 : daysUntilMonday));
        nextDate.setHours(0, 0, 0, 0);
        runs.push(formatDate(nextDate.toISOString()));
        date = nextDate;
        date.setDate(date.getDate() + 1); // Move past this Monday
      }
    }
    
    // For monthly cron (0 0 1 * *) - 1st of month
    else if (cronExpression === '0 0 1 * *') {
      for (let i = 0; i < count; i++) {
        const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        nextDate.setHours(0, 0, 0, 0);
        runs.push(formatDate(nextDate.toISOString()));
        date = nextDate;
        date.setDate(date.getDate() + 1); // Move past this 1st
      }
    }
    
    // Default: show some example dates
    else {
      const nextDate = new Date(date);
      for (let i = 0; i < count; i++) {
        nextDate.setDate(nextDate.getDate() + 1);
        runs.push(formatDate(nextDate.toISOString()));
      }
    }
    
    return runs;
  };

  // Get human-readable description for cron expression
  const getCronDescription = (cronExpression: string) => {
    // This is a simplified mock function for demonstration
    // In a real app, you would use a library like cron-parser or cronstrue
    
    switch (cronExpression) {
      case '0 0 * * *':
        return 'Daily at midnight';
      case '0 0 * * 1':
        return 'Weekly on Monday at midnight';
      case '0 0 1 * *':
        return 'Monthly on the 1st at midnight';
      case '0 0 * * 1-5':
        return 'Weekdays at midnight';
      case '0 12 * * *':
        return 'Daily at noon';
      default:
        return cronExpression;
    }
  };

  // Get status icon
  const getStatusIcon = (status: Schedule['status']) => {
    switch (status) {
      case 'active':
        return <RefreshCw size={16} />;
      case 'paused':
        return <Pause size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'error':
        return <AlertTriangle size={16} />;
      case 'created':
        return <Clock size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="schedules-page">
      <div className="schedules-header">
        <div>
          <h1 className="jpm-page-title">Schedules</h1>
          <p className="jpm-page-subtitle">Manage your scheduled data generation jobs</p>
        </div>
      </div>
      
      <div className="schedules-container">
        <div className="schedule-list-container">
          <Card>
            <Card.Header>
              <h2 className="form-section-title">Schedule List</h2>
            </Card.Header>
            <Card.Body>
              <div className="schedule-filters">
                <div className="search-container">
                  <Input
                    placeholder="Search schedules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search size={16} />}
                  />
                </div>
                <div className="status-filter">
                  <button
                    className={`status-filter-button ${statusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`status-filter-button ${statusFilter === 'active' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`status-filter-button ${statusFilter === 'paused' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('paused')}
                  >
                    Paused
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="templates-loading">
                  <div className="loader"></div>
                  <p>Loading schedules...</p>
                </div>
              ) : filteredSchedules.length === 0 ? (
                <div className="no-schedules">
                  <Calendar size={48} className="no-schedules-icon" />
                  <p>No schedules found.</p>
                  {searchTerm && (
                    <p>
                      Try adjusting your search or{' '}
                      <button
                        className="text-button"
                        onClick={() => setSearchTerm('')}
                      >
                        clear filters
                      </button>
                    </p>
                  )}
                </div>
              ) : (
                <div className="schedule-table-container">
                  <table className="schedule-table">
                    <thead>
                      <tr>
                        <th>Schedule</th>
                        <th>Template</th>
                        <th>Status</th>
                        <th>Next Run</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSchedules.map((schedule) => (
                        <tr key={schedule.id}>
                          <td>
                            <span className="schedule-name">{schedule.name}</span>
                            <span className="schedule-description">{schedule.description}</span>
                            <div className="schedule-info">
                              <span className="schedule-info-item">
                                <Database size={12} />
                                {schedule.rowCount} rows
                              </span>
                              <span className="schedule-info-item">
                                <FileText size={12} />
                                {schedule.outputFormat}
                              </span>
                              <span className="schedule-info-item">
                                <Clock size={12} />
                                {schedule.type === 'recurring' ? 'Recurring' : 'One-time'}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="schedule-template">
                              <FileText size={14} />
                              {schedule.template.name}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${schedule.status}`}>
                              {getStatusIcon(schedule.status)}
                              {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            {schedule.nextRunTime ? (
                              <div className="next-run">
                                <span className="next-run-time">{formatDate(schedule.nextRunTime)}</span>
                                <span className="next-run-relative">{formatRelativeTime(schedule.nextRunTime)}</span>
                              </div>
                            ) : (
                              <span className="text-muted">None scheduled</span>
                            )}
                          </td>
                          <td>
                            <div className="schedule-actions">
                              <Link to={`/schedules/${schedule.id}`} className="icon-button" title="View Details">
                                <Info size={16} />
                              </Link>
                              <button 
                                className="icon-button" 
                                title={schedule.status === 'active' ? 'Pause' : 'Activate'}
                                onClick={() => toggleScheduleStatus(schedule.id)}
                                disabled={!['active', 'paused'].includes(schedule.status)}
                              >
                                {schedule.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                              </button>
                              <Link to={`/schedules/${schedule.id}/edit`} className="icon-button" title="Edit">
                                <Edit size={16} />
                              </Link>
                              <button 
                                className="icon-button delete" 
                                title="Delete"
                                onClick={() => deleteSchedule(schedule.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
        
        <div className="create-schedule-form">
          <Card>
            <Card.Header>
              <h2 className="form-section-title">Create New Schedule</h2>
            </Card.Header>
            <Card.Body>
              <div className="schedule-form-section">
                <h3 className="schedule-form-section-title">Basic Information</h3>
                <div className="form-group">
                  <Input
                    label="Schedule Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea
                    className="jpm-input"
                    id="description"
                    name="description"
                    rows={2}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="templateId">Template</label>
                  <select
                    className="jpm-input"
                    id="templateId"
                    name="templateId"
                    value={formData.templateId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a template</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="schedule-form-section">
                <h3 className="schedule-form-section-title">Schedule Type</h3>
                <div className="schedule-type-selector">
                  <div className="schedule-type-option">
                    <div
                      className={`schedule-type-card ${formData.scheduleType === 'one-time' ? 'selected' : ''}`}
                      onClick={() => handleScheduleTypeSelect('one-time')}
                    >
                      <div className="schedule-type-icon">
                        <Clock size={24} />
                      </div>
                      <div className="schedule-type-label">One-time</div>
                    </div>
                  </div>
                  <div className="schedule-type-option">
                    <div
                      className={`schedule-type-card ${formData.scheduleType === 'recurring' ? 'selected' : ''}`}
                      onClick={() => handleScheduleTypeSelect('recurring')}
                    >
                      <div className="schedule-type-icon">
                        <RefreshCw size={24} />
                      </div>
                      <div className="schedule-type-label">Recurring</div>
                    </div>
                  </div>
                </div>
                
                {formData.scheduleType === 'one-time' ? (
                  <div className="form-group">
                    <Input
                      label="Run Date & Time"
                      name="nextRunTime"
                      type="datetime-local"
                      value={formData.nextRunTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label">Cron Schedule</label>
                    <div className="cron-presets">
                      <button
                        type="button"
                        className={`cron-preset-button ${formData.cronExpression === '0 0 * * *' ? 'selected' : ''}`}
                        onClick={() => handleCronPresetSelect('0 0 * * *')}
                      >
                        Daily
                      </button>
                      <button
                        type="button"
                        className={`cron-preset-button ${formData.cronExpression === '0 0 * * 1' ? 'selected' : ''}`}
                        onClick={() => handleCronPresetSelect('0 0 * * 1')}
                      >
                        Weekly
                      </button>
                      <button
                        type="button"
                        className={`cron-preset-button ${formData.cronExpression === '0 0 1 * *' ? 'selected' : ''}`}
                        onClick={() => handleCronPresetSelect('0 0 1 * *')}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        className={`cron-preset-button ${formData.cronExpression === '0 0 * * 1-5' ? 'selected' : ''}`}
                        onClick={() => handleCronPresetSelect('0 0 * * 1-5')}
                      >
                        Weekdays
                      </button>
                      <button
                        type="button"
                        className={`cron-preset-button ${formData.cronExpression === '0 12 * * *' ? 'selected' : ''}`}
                        onClick={() => handleCronPresetSelect('0 12 * * *')}
                      >
                        Noon Daily
                      </button>
                    </div>
                    <Input
                      label="Cron Expression"
                      name="cronExpression"
                      value={formData.cronExpression}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="cron-info">
                      {getCronDescription(formData.cronExpression)}
                    </div>
                    <div className="cron-next-runs">
                      <div className="cron-next-runs-title">Next 3 execution times:</div>
                      <ul className="cron-next-runs-list">
                        {getNextRunTimes(formData.cronExpression).map((run, index) => (
                          <li key={index}>{run}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="schedule-form-section">
                <h3 className="schedule-form-section-title">Output Settings</h3>
                <div className="form-row">
                  <div className="form-column">
                    <Input
                      label="Row Count"
                      name="rowCount"
                      type="number"
                      min="1"
                      max="10000"
                      value={formData.rowCount.toString()}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-column">
                    <div className="form-group">
                      <label className="form-label" htmlFor="outputFormat">Output Format</label>
                      <select
                        className="jpm-input"
                        id="outputFormat"
                        name="outputFormat"
                        value={formData.outputFormat}
                        onChange={handleInputChange}
                      >
                        <option value="CSV">CSV</option>
                        <option value="JSON">JSON</option>
                        <option value="XML">XML</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <Button
                  variant="primary"
                  leftIcon={<Plus size={16} />}
                  isLoading={isCreating}
                  onClick={createSchedule}
                >
                  Create Schedule
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;
