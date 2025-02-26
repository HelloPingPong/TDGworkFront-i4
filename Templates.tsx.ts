import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Search, 
  Filter,
  Eye,
  Download,
  Check,
  X
} from 'react-feather';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import './Templates.css';

interface Template {
  id: number;
  name: string;
  description: string;
  columnCount: number;
  defaultRowCount: number;
  defaultOutputFormat: string;
  createdAt: string;
  updatedAt: string;
}

const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);

  // Fetch templates (mock)
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setTemplates([
        {
          id: 1,
          name: 'Customer Data',
          description: 'Basic customer information including name, address, and contact details',
          columnCount: 8,
          defaultRowCount: 100,
          defaultOutputFormat: 'CSV',
          createdAt: '2025-02-15T14:32:00Z',
          updatedAt: '2025-02-20T09:15:00Z'
        },
        {
          id: 2,
          name: 'Loan Applications',
          description: 'Data for loan applications including applicant info and loan details',
          columnCount: 15,
          defaultRowCount: 50,
          defaultOutputFormat: 'JSON',
          createdAt: '2025-02-18T11:20:00Z',
          updatedAt: '2025-02-18T11:20:00Z'
        },
        {
          id: 3,
          name: 'Transaction Records',
          description: 'Financial transaction data with account details and amounts',
          columnCount: 10,
          defaultRowCount: 200,
          defaultOutputFormat: 'XML',
          createdAt: '2025-02-10T08:45:00Z',
          updatedAt: '2025-02-22T16:30:00Z'
        },
        {
          id: 4,
          name: 'Bankruptcy Notice',
          description: 'Template for bankruptcy notification letters',
          columnCount: 12,
          defaultRowCount: 25,
          defaultOutputFormat: 'CSV',
          createdAt: '2025-01-28T13:12:00Z',
          updatedAt: '2025-02-05T10:45:00Z'
        },
        {
          id: 5,
          name: 'Monthly Invoice',
          description: 'Monthly invoice data with customer and billing information',
          columnCount: 18,
          defaultRowCount: 75,
          defaultOutputFormat: 'JSON',
          createdAt: '2025-02-01T09:30:00Z',
          updatedAt: '2025-02-01T09:30:00Z'
        }
      ]);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter templates based on search term
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle template selection
  const toggleSelectTemplate = (id: number) => {
    if (selectedTemplates.includes(id)) {
      setSelectedTemplates(selectedTemplates.filter((templateId) => templateId !== id));
    } else {
      setSelectedTemplates([...selectedTemplates, id]);
    }
  };

  // Select all templates
  const toggleSelectAll = () => {
    if (selectedTemplates.length === filteredTemplates.length) {
      setSelectedTemplates([]);
    } else {
      setSelectedTemplates(filteredTemplates.map((template) => template.id));
    }
  };

  // Confirm delete template
  const confirmDeleteTemplate = (id: number) => {
    setTemplateToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Delete template
  const deleteTemplate = () => {
    if (templateToDelete) {
      setTemplates(templates.filter((template) => template.id !== templateToDelete));
      setShowDeleteConfirm(false);
      setTemplateToDelete(null);
    }
  };

  // Delete selected templates
  const deleteSelectedTemplates = () => {
    setTemplates(templates.filter((template) => !selectedTemplates.includes(template.id)));
    setSelectedTemplates([]);
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

  // Handle create new template
  const handleCreateTemplate = () => {
    navigate('/templates/new');
  };

  return (
    <div className="templates-page">
      <div className="templates-header">
        <div>
          <h1 className="jpm-page-title">Templates</h1>
          <p className="jpm-page-subtitle">Manage your data generation templates</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={handleCreateTemplate}
        >
          Create Template
        </Button>
      </div>

      <Card>
        <Card.Body>
          <div className="templates-toolbar">
            <div className="templates-search">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>
            <div className="templates-actions">
              {selectedTemplates.length > 0 && (
                <>
                  <span className="selected-count">
                    {selectedTemplates.length} selected
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash2 size={16} />}
                    onClick={deleteSelectedTemplates}
                  >
                    Delete Selected
                  </Button>
                </>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="templates-loading">
              <div className="loader"></div>
              <p>Loading templates...</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="templates-empty">
              <p>No templates found.</p>
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
            <div className="templates-table-container">
              <table className="templates-table">
                <thead>
                  <tr>
                    <th className="checkbox-column">
                      <label className="jpm-checkbox">
                        <input
                          type="checkbox"
                          checked={
                            selectedTemplates.length === filteredTemplates.length &&
                            filteredTemplates.length > 0
                          }
                          onChange={toggleSelectAll}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Columns</th>
                    <th>Format</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTemplates.map((template) => (
                    <tr key={template.id}>
                      <td className="checkbox-column">
                        <label className="jpm-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedTemplates.includes(template.id)}
                            onChange={() => toggleSelectTemplate(template.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td className="name-column">
                        <Link to={`/templates/${template.id}`}>
                          {template.name}
                        </Link>
                      </td>
                      <td className="description-column">
                        <span className="template-description">{template.description}</span>
                      </td>
                      <td>{template.columnCount}</td>
                      <td>
                        <span className="format-badge">{template.defaultOutputFormat}</span>
                      </td>
                      <td>{formatDate(template.updatedAt)}</td>
                      <td className="actions-column">
                        <div className="template-actions">
                          <button 
                            className="icon-button" 
                            title="View Template"
                            onClick={() => navigate(`/templates/${template.id}`)}
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className="icon-button" 
                            title="Edit Template"
                            onClick={() => navigate(`/templates/${template.id}/edit`)}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="icon-button" 
                            title="Duplicate Template"
                          >
                            <Copy size={16} />
                          </button>
                          <button 
                            className="icon-button delete" 
                            title="Delete Template"
                            onClick={() => confirmDeleteTemplate(template.id)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="jpm-modal-overlay">
          <div className="jpm-modal">
            <div className="jpm-modal-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="jpm-modal-body">
              <p>Are you sure you want to delete this template? This action cannot be undone.</p>
            </div>
            <div className="jpm-modal-footer">
              <Button
                variant="outline"
                leftIcon={<X size={16} />}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                leftIcon={<Trash2 size={16} />}
                onClick={deleteTemplate}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;
