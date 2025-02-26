import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  FileText, 
  CheckCircle, 
  Download, 
  Table, 
  Code, 
  RefreshCw, 
  Copy,
  Clock
} from 'react-feather';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import './GenerateData.css';

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

type OutputFormat = 'CSV' | 'JSON' | 'XML';

interface GenerationParams {
  templateId: number | null;
  rowCount: number;
  outputFormat: OutputFormat;
  filename: string;
}

interface GenerationResult {
  success: boolean;
  message: string;
  data: string;
  filename: string;
  format: OutputFormat;
  rows: number;
  columns: number;
  generatedAt: string;
}

const GenerateDataPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationParams, setGenerationParams] = useState<GenerationParams>({
    templateId: null,
    rowCount: 100,
    outputFormat: 'CSV',
    filename: 'generated_data'
  });
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [previewType, setPreviewType] = useState<'raw' | 'table'>('table');
  
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
  
  // Handle template selection
  const handleTemplateSelect = (template: Template) => {
    setGenerationParams({
      ...generationParams,
      templateId: template.id,
      rowCount: template.defaultRowCount,
      outputFormat: template.defaultOutputFormat as OutputFormat,
      filename: `${template.name.toLowerCase().replace(/\s+/g, '_')}_data`
    });
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'rowCount') {
      // Ensure value is a positive number
      const intValue = parseInt(value, 10);
      if (isNaN(intValue) || intValue < 1) return;
      
      setGenerationParams({
        ...generationParams,
        rowCount: intValue
      });
    } else if (name === 'filename') {
      setGenerationParams({
        ...generationParams,
        filename: value
      });
    }
  };
  
  // Handle format selection
  const handleFormatSelect = (format: OutputFormat) => {
    setGenerationParams({
      ...generationParams,
      outputFormat: format
    });
  };
  
  // Generate data
  const generateData = async () => {
    if (!generationParams.templateId) {
      alert('Please select a template');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const selectedTemplate = templates.find(t => t.id === generationParams.templateId)!;
      
      // Sample data based on template and format
      let data = '';
      
      if (generationParams.outputFormat === 'CSV') {
        data = `firstName,lastName,email,phoneNumber,streetAddress,city,state,zipCode\nJohn,Doe,john.doe@example.com,555-123-4567,123 Main St,New York,NY,10001\nJane,Smith,jane.smith@example.com,555-987-6543,456 Maple Ave,Los Angeles,CA,90001\nDavid,Johnson,david.johnson@example.com,555-456-7890,789 Oak Dr,Chicago,IL,60601\nSarah,Williams,sarah.williams@example.com,555-321-6547,321 Pine Ln,Houston,TX,77001\nMichael,Brown,michael.brown@example.com,555-654-3210,987 Cedar Rd,Phoenix,AZ,85001`;
      } else if (generationParams.outputFormat === 'JSON') {
        data = `[
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "555-123-4567",
    "streetAddress": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "555-987-6543",
    "streetAddress": "456 Maple Ave",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001"
  },
  {
    "firstName": "David",
    "lastName": "Johnson",
    "email": "david.johnson@example.com",
    "phoneNumber": "555-456-7890",
    "streetAddress": "789 Oak Dr",
    "city": "Chicago",
    "state": "IL",
    "zipCode": "60601"
  },
  {
    "firstName": "Sarah",
    "lastName": "Williams",
    "email": "sarah.williams@example.com",
    "phoneNumber": "555-321-6547",
    "streetAddress": "321 Pine Ln",
    "city": "Houston",
    "state": "TX",
    "zipCode": "77001"
  },
  {
    "firstName": "Michael",
    "lastName": "Brown",
    "email": "michael.brown@example.com",
    "phoneNumber": "555-654-3210",
    "streetAddress": "987 Cedar Rd",
    "city": "Phoenix",
    "state": "AZ",
    "zipCode": "85001"
  }
]`;
      } else if (generationParams.outputFormat === 'XML') {
        data = `<?xml version="1.0" encoding="UTF-8"?>
<customers>
  <customer>
    <firstName>John</firstName>
    <lastName>Doe</lastName>
    <email>john.doe@example.com</email>
    <phoneNumber>555-123-4567</phoneNumber>
    <streetAddress>123 Main St</streetAddress>
    <city>New York</city>
    <state>NY</state>
    <zipCode>10001</zipCode>
  </customer>
  <customer>
    <firstName>Jane</firstName>
    <lastName>Smith</lastName>
    <email>jane.smith@example.com</email>
    <phoneNumber>555-987-6543</phoneNumber>
    <streetAddress>456 Maple Ave</streetAddress>
    <city>Los Angeles</city>
    <state>CA</state>
    <zipCode>90001</zipCode>
  </customer>
  <customer>
    <firstName>David</firstName>
    <lastName>Johnson</lastName>
    <email>david.johnson@example.com</email>
    <phoneNumber>555-456-7890</phoneNumber>
    <streetAddress>789 Oak Dr</streetAddress>
    <city>Chicago</city>
    <state>IL</state>
    <zipCode>60601</zipCode>
  </customer>
  <customer>
    <firstName>Sarah</firstName>
    <lastName>Williams</lastName>
    <email>sarah.williams@example.com</email>
    <phoneNumber>555-321-6547</phoneNumber>
    <streetAddress>321 Pine Ln</streetAddress>
    <city>Houston</city>
    <state>TX</state>
    <zipCode>77001</zipCode>
  </customer>
  <customer>
    <firstName>Michael</firstName>
    <lastName>Brown</lastName>
    <email>michael.brown@example.com</email>
    <phoneNumber>555-654-3210</phoneNumber>
    <streetAddress>987 Cedar Rd</streetAddress>
    <city>Phoenix</city>
    <state>AZ</state>
    <zipCode>85001</zipCode>
  </customer>
</customers>`;
      }
      
      setGenerationResult({
        success: true,
        message: `Successfully generated ${generationParams.rowCount} rows of data.`,
        data,
        filename: `${generationParams.filename}.${generationParams.outputFormat.toLowerCase()}`,
        format: generationParams.outputFormat,
        rows: generationParams.rowCount,
        columns: selectedTemplate.columnCount,
        generatedAt: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error generating data:', error);
      alert('Failed to generate data. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Download generated data
  const downloadData = () => {
    if (!generationResult) return;
    
    const blob = new Blob([generationResult.data], { 
      type: getContentType(generationResult.format) 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = generationResult.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Get content type based on format
  const getContentType = (format: OutputFormat) => {
    switch (format) {
      case 'CSV':
        return 'text/csv';
      case 'JSON':
        return 'application/json';
      case 'XML':
        return 'application/xml';
      default:
        return 'text/plain';
    }
  };
  
  // Copy data to clipboard
  const copyToClipboard = () => {
    if (!generationResult) return;
    
    navigator.clipboard.writeText(generationResult.data)
      .then(() => {
        alert('Data copied to clipboard');
      })
      .catch(err => {
        console.error('Error copying to clipboard:', err);
        alert('Failed to copy data to clipboard');
      });
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
  
  // Render preview content
  const renderPreviewContent = () => {
    if (!generationResult) return null;
    
    if (previewType === 'raw' || generationResult.format !== 'CSV') {
      return (
        <div className="preview-content">
          {generationResult.data}
        </div>
      );
    }
    
    // Parse CSV for table view
    const rows = generationResult.data.split('\n');
    const headers = rows[0].split(',');
    const dataRows = rows.slice(1);
    
    return (
      <div className="preview-content">
        <table className="preview-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.split(',').map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="generate-data-page">
      <h1 className="jpm-page-title">Generate Data</h1>
      <p className="jpm-page-subtitle">Generate test data using your templates</p>
      
      <div className="generate-data-container">
        <div className="generation-form">
          <Card>
            <Card.Header>
              <h2 className="form-section-title">Generation Settings</h2>
            </Card.Header>
            <Card.Body>
              {isLoading ? (
                <div className="templates-loading">
                  <div className="loader"></div>
                  <p>Loading templates...</p>
                </div>
              ) : (
                <>
                  <div className="template-selector">
                    <h3 className="mb-3">Select Template</h3>
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`template-card ${generationParams.templateId === template.id ? 'selected' : ''}`}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <input
                          type="radio"
                          name="templateId"
                          id={`template-${template.id}`}
                          checked={generationParams.templateId === template.id}
                          onChange={() => handleTemplateSelect(template)}
                          className="template-card-radio"
                        />
                        <div className="template-card-info">
                          <div className="template-card-title">{template.name}</div>
                          <div className="template-card-description">
                            {template.description}
                          </div>
                          <div className="template-card-details">
                            <div className="template-card-detail">
                              <FileText size={12} />
                              {template.columnCount} columns
                            </div>
                            <div className="template-card-detail">
                              <Database size={12} />
                              {template.defaultRowCount} rows
                            </div>
                            <div className="template-card-detail">
                              <Clock size={12} />
                              Updated {formatDate(template.updatedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="generation-options">
                    <h3 className="mb-3">Output Settings</h3>
                    
                    <div className="format-options">
                      <div className="format-option">
                        <div
                          className={`format-option-card ${generationParams.outputFormat === 'CSV' ? 'selected' : ''}`}
                          onClick={() => handleFormatSelect('CSV')}
                        >
                          <div className="format-option-icon">
                            <FileText size={24} />
                          </div>
                          <div className="format-option-label">CSV</div>
                        </div>
                      </div>
                      <div className="format-option">
                        <div
                          className={`format-option-card ${generationParams.outputFormat === 'JSON' ? 'selected' : ''}`}
                          onClick={() => handleFormatSelect('JSON')}
                        >
                          <div className="format-option-icon">
                            <Code size={24} />
                          </div>
                          <div className="format-option-label">JSON</div>
                        </div>
                      </div>
                      <div className="format-option">
                        <div
                          className={`format-option-card ${generationParams.outputFormat === 'XML' ? 'selected' : ''}`}
                          onClick={() => handleFormatSelect('XML')}
                        >
                          <div className="format-option-icon">
                            <Code size={24} />
                          </div>
                          <div className="format-option-label">XML</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-column">
                        <Input
                          label="Row Count"
                          name="rowCount"
                          type="number"
                          min="1"
                          max="10000"
                          value={generationParams.rowCount.toString()}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-column">
                        <Input
                          label="Filename"
                          name="filename"
                          value={generationParams.filename}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <Button
                      className="generate-button"
                      variant="primary"
                      leftIcon={<Database size={16} />}
                      isLoading={isGenerating}
                      onClick={generateData}
                      disabled={!generationParams.templateId}
                    >
                      Generate Data
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
        
        <div className="preview-section">
          <Card>
            <Card.Header>
              <div className="preview-header">
                <h2 className="preview-title">Data Preview</h2>
                {generationResult && generationResult.format === 'CSV' && (
                  <div className="preview-toggle">
                    <button
                      className={`jpm-button jpm-button-${previewType === 'table' ? 'primary' : 'outline'} jpm-button-sm`}
                      onClick={() => setPreviewType('table')}
                    >
                      <Table size={14} /> Table
                    </button>
                    <button
                      className={`jpm-button jpm-button-${previewType === 'raw' ? 'primary' : 'outline'} jpm-button-sm`}
                      onClick={() => setPreviewType('raw')}
                    >
                      <Code size={14} /> Raw
                    </button>
                  </div>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              {isGenerating ? (
                <div className="templates-loading">
                  <div className="loader"></div>
                  <p>Generating data...</p>
                </div>
              ) : generationResult ? (
                <div className="generation-result">
                  {renderPreviewContent()}
                  
                  <div className="preview-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Copy size={16} />}
                      onClick={copyToClipboard}
                    >
                      Copy to Clipboard
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Download size={16} />}
                      onClick={downloadData}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="templates-empty">
                  <Database size={48} color="var(--jpm-neutral-400)" />
                  <p>Select a template and generate data to see a preview.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GenerateDataPage;
