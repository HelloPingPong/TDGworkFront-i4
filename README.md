# TDGworkFront-i4
frontend effort for tdg project

tdg-frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── assets/
│       └── images/
│           └── jpm-logo.svg
├── src/
│   ├── api/
│   │   ├── index.ts
│   │   ├── templateApi.ts
│   │   ├── generationApi.ts
│   │   ├── scheduleApi.ts
│   │   ├── batchApi.ts
│   │   └── pdfApi.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Tabs.tsx
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── features/
│   │       ├── templates/
│   │       │   ├── TemplateList.tsx
│   │       │   ├── TemplateForm.tsx
│   │       │   ├── ColumnDefinitionForm.tsx
│   │       │   └── DataTypeSelector.tsx
│   │       ├── generation/
│   │       │   ├── GenerationForm.tsx
│   │       │   └── GenerationResult.tsx
│   │       ├── schedules/
│   │       │   ├── ScheduleList.tsx
│   │       │   └── ScheduleForm.tsx
│   │       ├── batch/
│   │       │   ├── BatchGenerationForm.tsx
│   │       │   └── BatchResults.tsx
│   │       └── pdf/
│   │           ├── PDFUploader.tsx
│   │           └── TemplatePreview.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Templates.tsx
│   │   ├── GenerateData.tsx
│   │   ├── Schedules.tsx
│   │   ├── BatchGeneration.tsx
│   │   ├── PDFAnalysis.tsx
│   │   └── NotFound.tsx
│   ├── models/
│   │   ├── Template.ts
│   │   ├── ColumnDefinition.ts
│   │   ├── Schedule.ts
│   │   └── BatchRequest.ts
│   ├── hooks/
│   │   ├── useApi.ts
│   │   ├── useTemplates.ts
│   │   ├── useSchedules.ts
│   │   └── useDataTypes.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── utils/
│   │   ├── api.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.tsx
│   ├── index.tsx
│   └── routes.tsx
├── package.json
├── tsconfig.json
└── README.md
