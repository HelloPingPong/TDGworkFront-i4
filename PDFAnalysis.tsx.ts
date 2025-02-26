import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Upload, 
  X, 
  Search, 
  CheckCircle, 
  Edit, 
  Trash2, 
  Download, 
  Save,
  Eye,
  Database
} from 'react-feather';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './PDFAnalysis.css';

interface ExtractedVariable {
  id: string;
  name: string;
  type: string;
  originalType?: string;
}

interface TemplatePreview {
  name: string;
  description: string;
  variables: ExtractedVariable[];
  outputFormat: string;
  rowCount: number;
}

const PDFAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [templatePreview, setTemplatePreview] = useState<TemplatePreview | null>(null);
  const [analysisSuccess, setAnalysisSuccess] = useState(false);
  
  // Sample data types for dropdown
  const dataTypes = [
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'fullName', label: 'Full Name' },
    { value: 'email', label: 'Email' },
    { value: 'phoneNumber', label: 'Phone Number' },
    { value: 'ssn', label: 'SSN' },
    { value: 'streetAddress', label: 'Street Address' },
    { value: 'city', label: 'City' },
    { value: 'state', label: 'State' },
    { value: 'zipCode', label: 'Zip Code' },
    { value: 'country', label: 'Country' },
    { value: 'date', label: 'Date' },
    { value: 'accountNumber', label: 'Account Number' },
    { value: 'currency', label: 'Currency' },
    { value: 'creditCardNumber', label: 'Credit Card Number' },
    { value: 'idNumber', label: 'ID Number' },
    { value: 'string', label: 'Random String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' }
  ];
  
  // Mock analysis steps
  const analysisSteps = [
    'Loading PDF document',
    'Extracting text content',
    'Detecting variables',
    'Analyzing variable types',
    'Generating template'
  ];
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Only PDF files are allowed.');
      }
    }
  };
  
  // Handle drop area click
  const handleDropAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle file removal
  const handleFileRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setTemplatePreview(null);
    setAnalysisSuccess(false);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Extract variables from PDF
  const extractVariables = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file first.');
      return;
    }
    
    setIsAnalyzing(true);
    setActiveStep(0);
    setTemplatePreview(null);
    setAnalysisSuccess(false);
    
    try {
      // Simulate PDF analysis process with steps
      for (let i = 0; i < analysisSteps.length; i++) {
        setActiveStep(i);
        // Wait between steps to simulate processing
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Mock detected variables
      const templateName = selectedFile.name.replace('.pdf', '').replace(/[^a-zA-Z0-9_]/g, '_');
      
      const extractedVariables: ExtractedVariable[] = [
        { id: '1', name: 'customerName', type: 'fullName', originalType: 'fullName' },
        { id: '2', name: 'customerAddress', type: 'streetAddress', originalType: 'streetAddress' },
        { id: '3', name: 'city', type: 'city', originalType: 'city' },
        { id: '4', name: 'state', type: 'state', originalType: 'state' },
        { id: '5', name: 'zipCode', type: 'zipCode', originalType: 'zipCode' },
        { id: '6', name: 'loanNumber', type: 'accountNumber', originalType: 'accountNumber' },
        { id: '7', name: 'accountBalance', type: 'currency', originalType: 'currency' },
        { id: '8', name: 'dueDate', type: 'date', originalType: 'date' },
        { id: '9', name: 'bankruptcyStatus', type: 'boolean', originalType: 'boolean' },
        { id: '10', name: 'customerEmail', type: 'email', originalType: 'email' },
        { id: '11', name: 'customerPhone', type: 'phoneNumber', originalType: 'phoneNumber' },
        { id: '12', name: 'lastPaymentDate', type: 'date', originalType: 'date' }
      ];
      
      setTemplatePreview({
        name: `${templateName}_Template`,
        description: `Template generated from ${selectedFile.name}`,
        variables: extractedVariables,
        outputFormat: 'CSV',
        rowCount: 100
      });
      
      setAnalysisSuccess(true);
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      alert('Failed to analyze PDF. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setActiveStep(null);
    }
  };
  
  // Handle variable type change
  const handleVariableTypeChange = (variableId: string, newType: string) => {
    if (!templatePreview) return;
    
    setTemplatePreview({
      ...templatePreview,
      variables: templatePreview.variables.map(variable => {
        if (variable.id === variableId) {
          return {
            ...variable,
            type: newType
          };
        }
        return variable;
      })
    });
  };
  
  // Save template and navigate
  const saveTemplate = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Success - would normally navigate to the new template
      alert('Template saved successfully!');
      navigate('/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Please try again.');
    }
  };
  
  // View generated data
  const viewGeneratedData = () => {
    navigate('/generate');
  };
  
  return (
    <div className="pdf-analysis-page">
      <h1 className="jpm-page-title">PDF Analysis</h1>
      <p className="jpm-page-subtitle">Extract variables from redline PDFs to create templates</p>
      
      <div className="pdf-analysis-container">
        <div className="pdf-upload-section">
          <Card>
            <Card.Header>
              <h2 className="form-section-title">Upload Redline PDF</h2>
            </Card.Header>
            <Card.Body>
              {!selectedFile ? (
                <div className="upload-area" onClick={handleDropAreaClick}>
                  <Upload size={48} className="upload-icon" />
                  <h3 className="upload-text">Click to upload or drag and drop</h3>
                  <p className="upload-subtext">PDF files only (Max 10MB)</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="upload-input"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                  />
                </div>
              ) : (
                <div className="pdf-preview">
                  <div className="pdf-filename">
                    <FileText size={24} className="pdf-filename-icon" />
                    <span className="pdf-filename-text">{selectedFile.name}</span>
                    <span className="pdf-filename-size">{formatFileSize(selectedFile.size)}</span>
                    <button
                      className="pdf-filename-remove"
                      onClick={handleFileRemove}
                      title="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {isAnalyzing ? (
                    <div className="pdf-analysis-loading">
                      <div className="loader"></div>
                      <h3>Analyzing PDF...</h3>
                      <div className="pdf-analysis-steps">
                        {analysisSteps.map((step, index) => (
                          <div
                            key={index}
                            className={`pdf-analysis-step ${
                              activeStep === index
                                ? 'active'
                                : activeStep !== null && activeStep > index
                                ? 'completed'
                                : ''
                            }`}
                          >
                            {activeStep !== null && activeStep > index ? (
                              <CheckCircle size={16} className="pdf-analysis-step-icon" />
                            ) : (
                              <div
                                className={`step-number ${
                                  activeStep === index ? 'active' : ''
                                }`}
                              >
                                {index + 1}
                              </div>
                            )}
                            <span className="pdf-analysis-step-text">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="extract-button"
                      variant="primary"
                      leftIcon={<Search size={16} />}
                      onClick={extractVariables}
                    >
                      Extract Variables
                    </Button>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
          
          {analysisSuccess && (
            <div className="analysis-success">
              <CheckCircle size={48} className="success-icon" />
              <h2 className="success-title">Analysis Complete!</h2>
              <p className="success-text">
                Successfully extracted {templatePreview?.variables.length} variables from the PDF.
              </p>
              <div className="success-actions">
                <Button
                  variant="outline"
                  leftIcon={<Eye size={16} />}
                  onClick={viewGeneratedData}
                >
                  Generate Sample Data
                </Button>
                <Button
                  variant="primary"
                  leftIcon={<Save size={16} />}
                  onClick={saveTemplate}
                >
                  Save Template
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="preview-section">
          <Card>
            <Card.Header>
              <div className="template-preview-heading">
                <h2 className="template-preview-title">Template Preview</h2>
                {templatePreview && (
                  <div className="template-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Save size={16} />}
                      onClick={saveTemplate}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              {templatePreview ? (
                <div className="template-preview">
                  <div className="template-summary">
                    <div className="template-summary-row">
                      <span className="template-summary-label">Template Name:</span>
                      <span className="template-summary-value">{templatePreview.name}</span>
                    </div>
                    <div className="template-summary-row">
                      <span className="template-summary-label">Description:</span>
                      <span className="template-summary-value">{templatePreview.description}</span>
                    </div>
                    <div className="template-summary-row">
                      <span className="template-summary-label">Variables:</span>
                      <span className="template-summary-value">{templatePreview.variables.length}</span>
                    </div>
                    <div className="template-summary-row">
                      <span className="template-summary-label">Default Output Format:</span>
                      <span className="template-summary-value">{templatePreview.outputFormat}</span>
                    </div>
                    <div className="template-summary-row">
                      <span className="template-summary-label">Default Row Count:</span>
                      <span className="template-summary-value">{templatePreview.rowCount}</span>
                    </div>
                  </div>
                  
                  <div className="variables-section">
                    <h3 className="form-section-title">Extracted Variables</h3>
                    <div className="variables-count">
                      {templatePreview.variables.length} variables detected
                    </div>
                    
                    <div className="variables-grid">
                      {templatePreview.variables.map((variable) => (
                        <div className="variable-card" key={variable.id}>
                          <div className="variable-name">{variable.name}</div>
                          <div className="variable-type">
                            <Database size={14} />
                            {dataTypes.find(dt => dt.value === variable.type)?.label || variable.type}
                          </div>
                          <div className="variable-edit">
                            <select
                              className="variable-edit-type"
                              value={variable.type}
                              onChange={(e) => handleVariableTypeChange(variable.id, e.target.value)}
                            >
                              {dataTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="preview-empty">
                  <FileText size={48} className="preview-empty-icon" />
                  <p>Upload a redline PDF and extract variables to see the preview</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PDFAnalysisPage;
