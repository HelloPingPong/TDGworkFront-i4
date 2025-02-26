import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import TemplateForm from './pages/TemplateForm';
import GenerateData from './pages/GenerateData';
import Schedules from './pages/Schedules';
import PDFAnalysis from './pages/PDFAnalysis';
import BatchGeneration from './pages/BatchGeneration';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'templates',
        children: [
          { index: true, element: <Templates /> },
          { path: 'new', element: <TemplateForm /> },
          { path: ':id', element: <TemplateForm /> },
          { path: ':id/edit', element: <TemplateForm /> }
        ]
      },
      {
        path: 'generate',
        element: <GenerateData />
      },
      {
        path: 'schedules',
        children: [
          { index: true, element: <Schedules /> },
          { path: ':id', element: <Schedules /> },
          { path: ':id/edit', element: <Schedules /> }
        ]
      },
      {
        path: 'batch',
        element: <BatchGeneration />
      },
      {
        path: 'pdf-analysis',
        element: <PDFAnalysis />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;
