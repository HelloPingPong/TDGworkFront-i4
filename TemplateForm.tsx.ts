import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  X, 
  Plus, 
  ChevronDown, 
  ChevronUp,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown 
} from 'react-feather';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import './Templates.css';

interface ColumnDefinition {
  id: string;
  name: string;
  type: string;
  sequenceNumber: number;
  isNullable: boolean;
  nullProbability: number;
  constraints: Record<string, any>;
  expanded?: boolean;
}

interface TemplateFormData {
  id?: number;
  name: string;
  description: string;
  defaultOutputFormat: string;
  defaultRowCount: number;
  columnDefinitions: ColumnDefinition[];
}

const TemplateForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: '',
    defaultOutputFormat: 'CSV',
    defaultRowCount: 100,
    columnDefinitions: []
  });
  
  const [dataTypes, setDataTypes] = useState([
    { value: 'firstName', label: 'First Name', category: 'Personal' },
    { value: 'lastName', label: 'Last Name', category: 'Personal' },
    { value: 'fullName', label: 'Full Name', category: 'Personal' },
    { value: 'email', label: 'Email', category: 'Personal' },
    { value: 'phoneNumber', label: 'Phone Number', category: 'Personal' },
    { value: 'ssn', label: 'SSN', category: 'Personal' },
    { value: 'streetAddress', label: 'Street Address', category: 'Address' },
    { value: 'city', label: 'City', category: 'Address' },
    { value: 'state', label: 'State', category: 'Address' },
    { value: 'zipCode', label: 'Zip Code', category: 'Address' },
    { value: 'country', label: 'Country', category: 'Address' },
    { value: 'date', label: 'Date', category: 'DateTime' },
    { value: 'time', label: 'Time', category: 'DateTime' },
    { value: 'accountNumber', label: 'Account Number', category: 'Finance' },
    { value: 'currency', label: 'Currency', category: 'Finance' },
    { value: 'creditCardNumber', label: 'Credit Card Number', category: 'Finance' },
    { value: 'idNumber', label: 'ID Number', category: 'Identity' },
    { value: 'uuid', label: 'UUID', category: 'Technical' },
    { value: 'string', label: 'Random String', category: 'Text' },
    { value: 'number', label: 'Number', category: 'Numeric' },
    { value: 'boolean', label: 'Boolean', category: 'Technical' }
  ]);
  
  // Fetch template data for edit mode
  useEffect(() => {
    if (isEditMode) {
      // Simulating API call
      setTimeout(() => {
        setFormData({
          id: parseInt(id),
          name: 'Customer Data',
          description: 'Basic customer information including name, address, and contact details',
          defaultOutputFormat: 'CSV',
          defaultRowCount: 100,
          columnDefinitions: [
            {
              id: '1',
              name: 'firstName',
              type: 'firstName',
              sequenceNumber: 1,
              isNullable: false,
              nullProbability: 0,
              constraints: {},
              expanded: false
            },
            {
              id: '2',
              name: 'lastName',
              type: 'lastName',
              sequenceNumber: 2,
              isNullable: false,
              nullProbability: 0,
              constraints: {},
              expanded: false
            },
            {
              id: '3',
              name: 'email',
              type: 'email',
              sequenceNumber: 3,
              isNullable: true,
              nullProbability: 0.1,
              constraints: {},
              expanded: false
            },
            {
              id: '4',
              name: 'phoneNumber',
              type: 'phoneNumber',
              sequenceNumber: 4,
              isNullable: true,
              nullProbability: 0.2,
              constraints: {
                format: '###-###-####'
              },
              expanded: false
            },
            {
              id: '5',
              name: 'streetAddress',
              type: 'streetAddress',
              sequenceNumber: 5,
              isNullable: false,
              nullProbability: 0,
              constraints: {},
              expanded: false
            },
            {
              id: '6',
              name: 'city',
              type: 'city',
              sequenceNumber: 6,
              isNullable: false,
              nullProbability: 0,
              constraints: {},
              expanded: false
            },
            {
              id: '7',
              name: 'state',
              type: 'state',
              sequenceNumber: 7,
              isNullable: false,
              nullProbability: 0,
              constraints: {},
              expanded: false
            },
            {
              id: '8',
              name: 'zipCode',
              type: 'zipCode',
              sequenceNumber: 8,
              isNullable: false,
              nullProbability: 0,
              constraints: {},
              expanded: false
            }
          ]
        });
        setIsLoading(false);
      }, 800);
    }
  }, [id, isEditMode]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle column input changes
  const handleColumnInputChange = (columnId: string, field: string, value: any) => {
    setFormData({
      ...formData,
      columnDefinitions: formData.columnDefinitions.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            [field]: value
          };
        }
        return column;
      })
    });
  };
  
  // Handle column constraint changes
  const handleConstraintChange = (columnId: string, constraintName: string, value: any) => {
    setFormData({
      ...formData,
      columnDefinitions: formData.columnDefinitions.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            constraints: {
              ...column.constraints,
              [constraintName]: value
            }
          };
        }
        return column;
      })
    });
  };
  
  // Toggle column expanded state
  const toggleColumnExpanded = (columnId: string) => {
    setFormData({
      ...formData,
      columnDefinitions: formData.columnDefinitions.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            expanded: !column.expanded
          };
        }
        return column;
      })
    });
  };
  
  // Add new column
  const addColumn = () => {
    const newColumn: ColumnDefinition = {
      id: Math.random().toString(36).substring(2, 9),
      name: `column${formData.columnDefinitions.length + 1}`,
      type: 'string',
      sequenceNumber: formData.columnDefinitions.length + 1,
      isNullable: false,
      nullProbability: 0,
      constraints: {},
      expanded: true
    };
    
    setFormData({
      ...formData,
      columnDefinitions: [...formData.columnDefinitions, newColumn]
    });
  };
  
  // Delete column
  const deleteColumn = (columnId: string) => {
    const updatedColumns = formData.columnDefinitions
      .filter(column => column.id !== columnId)
      .map((column, index) => ({
        ...column,
        sequenceNumber: index + 1
      }));
    
    setFormData({
      ...formData,
      columnDefinitions: updatedColumns
    });
  };
  
  // Move column up
  const moveColumnUp = (columnId: string) => {
    const columnIndex = formData.columnDefinitions.findIndex(column => column.id === columnId);
    if (columnIndex <= 0) return;
    
    const updatedColumns = [...formData.columnDefinitions];
    const temp = updatedColumns[columnIndex];
    updatedColumns[columnIndex] = updatedColumns[columnIndex - 1];
    updatedColumns[columnIndex - 1] = temp;
    
    // Update sequence numbers
    updatedColumns.forEach((column, index) => {
      column.sequenceNumber = index + 1;
    });
    
    setFormData({
      ...formData,
      columnDefinitions: updatedColumns
    });
  };
  
  // Move column down
  const moveColumnDown = (columnId: string) => {
    const columnIndex = formData.columnDefinitions.findIndex(column => column.id === columnId);
    if (columnIndex >= formData.columnDefinitions.length - 1) return;
    
    const updatedColumns = [...formData.columnDefinitions];
    const temp = updatedColumns[columnIndex];
    updatedColumns[columnIndex] = updatedColumns[columnIndex + 1];
    updatedColumns[columnIndex + 1] = temp;
    
    // Update sequence numbers
    updatedColumns.forEach((column, index) => {
      column.sequenceNumber = index + 1;
    });
    
    setFormData({
      ...formData,
      columnDefinitions: updatedColumns
    });
  };
  
  // Duplicate column
  const duplicateColumn = (columnId: string) => {
    const columnToDuplicate = formData.columnDefinitions.find(column => column.id === columnId);
    if (!columnToDuplicate) return;
    
    const newColumn: ColumnDefinition = {
      ...columnToDuplicate,
      id: Math.random().toString(36).substring(2, 9),
      name: `${columnToDuplicate.name}_copy`,
      sequenceNumber: formData.columnDefinitions.length + 1,
      expanded: true
    };
    
    setFormData({
      ...formData,
      columnDefinitions: [...formData.columnDefinitions, newColumn]
    });
  };
  
  // Get constraints for a data type
  const getConstraintsForType = (type: string) => {
    switch (type) {
      case 'string':
        return [
          { name: 'minLength', label: 'Min Length', type: 'number', defaultValue: 5 },
          { name: 'maxLength', label: 'Max Length', type: 'number', defaultValue: 30 },
          { name: 'pattern', label: 'Regex Pattern', type: 'text', defaultValue: '' },
          { name: 'alphaOnly', label: 'Alpha Only', type: 'checkbox', defaultValue: false }
        ];
      case 'number':
        return [
          { name: 'min', label: 'Min Value', type: 'number', defaultValue: 0 },
          { name: 'max', label: 'Max Value', type: 'number', defaultValue: 100 },
          { name: 'precision', label: 'Decimal Precision', type: 'number', defaultValue: 0 }
        ];
      case 'date':
        return [
          { name: 'minDate', label: 'Min Date', type: 'date', defaultValue: '' },
          { name: 'maxDate', label: 'Max Date', type: 'date', defaultValue: '' },
          { name: 'format', label: 'Format', type: 'text', defaultValue: 'yyyy-MM-dd' }
        ];
      case 'phoneNumber':
        return [
          { name: 'format', label: 'Format', type: 'text', defaultValue: '###-###-####' }
        ];
      case 'zipCode':
        return [
          { name: 'format', label: 'Format', type: 'select', 
            options: [
              { value: '5digit', label: '5-Digit (12345)' },
              { value: '9digit', label: '9-Digit (12345-6789)' }
            ], 
            defaultValue: '5digit' 
          }
        ];
      default:
        return [];
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Template name is required');
      return;
    }
    
    if (formData.columnDefinitions.length === 0) {
      alert('At least one column is required');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Successful save
      console.log('Form submitted:', formData);
      navigate('/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/templates');
  };
  
  if (isLoading) {
    return (
      <div className="template-form-container">
        <div className="templates-loading">
          <div className="loader"></div>
          <p>Loading template data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="template-form-container">
      <div className="template-form-header">
        <h1 className="jpm-page-title">
          {isEditMode ? 'Edit Template' : 'Create Template'}
        </h1>
        <div className="template-form-actions">
          <Button
            variant="outline"
            onClick={handleCancel}
            leftIcon={<X size={16} />}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            leftIcon={<Save size={16} />}
            isLoading={isSaving}
          >
            {isEditMode ? 'Update Template' : 'Save Template'}
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <Card.Header>
            <h2 className="form-section-title">Basic Information</h2>
          </Card.Header>
          <Card.Body>
            <div className="form-row">
              <div className="form-column">
                <Input
                  label="Template Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label" htmlFor="defaultOutputFormat">Default Output Format</label>
                  <select
                    className="jpm-input"
                    id="defaultOutputFormat"
                    name="defaultOutputFormat"
                    value={formData.defaultOutputFormat}
                    onChange={handleInputChange}
                  >
                    <option value="CSV">CSV</option>
                    <option value="JSON">JSON</option>
                    <option value="XML">XML</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea
                    className="jpm-input"
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-column">
                <Input
                  label="Default Row Count"
                  name="defaultRowCount"
                  type="number"
                  min="1"
                  max="10000"
                  value={formData.defaultRowCount.toString()}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>
            <h2 className="form-section-title">Column Definitions</h2>
          </Card.Header>
          <Card.Body>
            <div className="columns-container">
              {formData.columnDefinitions.map((column, index) => (
                <div className="column-item" key={column.id}>
                  <div className="column-header">
                    <div className="column-title">
                      {index + 1}. {column.name} ({
                        dataTypes.find(dt => dt.value === column.type)?.label || column.type
                      })
                    </div>
                    <div className="column-actions">
                      <button
                        type="button"
                        className="icon-button"
                        title="Move Up"
                        onClick={() => moveColumnUp(column.id)}
                        disabled={index === 0}
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        className="icon-button"
                        title="Move Down"
                        onClick={() => moveColumnDown(column.id)}
                        disabled={index === formData.columnDefinitions.length - 1}
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        type="button"
                        className="icon-button"
                        title="Duplicate"
                        onClick={() => duplicateColumn(column.id)}
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        type="button"
                        className="icon-button delete"
                        title="Delete"
                        onClick={() => deleteColumn(column.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="column-expand-button"
                        onClick={() => toggleColumnExpanded(column.id)}
                        title={column.expanded ? 'Collapse' : 'Expand'}
                      >
                        {column.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  {column.expanded && (
                    <div className="column-details">
                      <div className="form-row">
                        <div className="form-column">
                          <Input
                            label="Column Name"
                            value={column.name}
                            onChange={(e) => handleColumnInputChange(column.id, 'name', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-column">
                          <div className="form-group">
                            <label className="form-label">Data Type</label>
                            <select
                              className="jpm-input"
                              value={column.type}
                              onChange={(e) => handleColumnInputChange(column.id, 'type', e.target.value)}
                            >
                              {dataTypes.map(dt => (
                                <option key={dt.value} value={dt.value}>
                                  {dt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-column">
                          <div className="form-group">
                            <label className="form-label">
                              <input
                                type="checkbox"
                                checked={column.isNullable}
                                onChange={(e) => 
                                  handleColumnInputChange(column.id, 'isNullable', e.target.checked)
                                }
                              />
                              {' '}Allow Null Values
                            </label>
                          </div>
                        </div>
                        {column.isNullable && (
                          <div className="form-column">
                            <Input
                              label="Null Probability (0-1)"
                              type="number"
                              min="0"
                              max="1"
                              step="0.1"
                              value={column.nullProbability.toString()}
                              onChange={(e) => 
                                handleColumnInputChange(column.id, 'nullProbability', parseFloat(e.target.value))
                              }
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Data type specific constraints */}
                      {getConstraintsForType(column.type).length > 0 && (
                        <div className="form-section">
                          <h3 className="form-section-title">Constraints</h3>
                          
                          <div className="form-row">
                            {getConstraintsForType(column.type).map(constraint => (
                              <div className="form-column" key={constraint.name}>
                                {constraint.type === 'checkbox' ? (
                                  <div className="form-group">
                                    <label className="form-label">
                                      <input
                                        type="checkbox"
                                        checked={column.constraints[constraint.name] ?? constraint.defaultValue}
                                        onChange={(e) => 
                                          handleConstraintChange(column.id, constraint.name, e.target.checked)
                                        }
                                      />
                                      {' '}{constraint.label}
                                    </label>
                                  </div>
                                ) : constraint.type === 'select' ? (
                                  <div className="form-group">
                                    <label className="form-label">{constraint.label}</label>
                                    <select
                                      className="jpm-input"
                                      value={column.constraints[constraint.name] ?? constraint.defaultValue}
                                      onChange={(e) => 
                                        handleConstraintChange(column.id, constraint.name, e.target.value)
                                      }
                                    >
                                      {constraint.options?.map(option => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : (
                                  <Input
                                    label={constraint.label}
                                    type={constraint.type}
                                    value={column.constraints[constraint.name] ?? constraint.defaultValue}
                                    onChange={(e) => 
                                      handleConstraintChange(column.id, constraint.name, e.target.value)
                                    }
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              className="add-column-button"
              onClick={addColumn}
            >
              <Plus size={16} />
              Add Column
            </button>
          </Card.Body>
        </Card>
        
        <div className="form-footer">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            leftIcon={<Save size={16} />}
            isLoading={isSaving}
          >
            {isEditMode ? 'Update Template' : 'Save Template'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;
