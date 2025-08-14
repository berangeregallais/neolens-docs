// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'overview',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/getting-started',
        'getting-started/quickstart',
        'getting-started/authentication',
        'getting-started/rate-limiting',
      ],
    },
    {
      type: 'doc',
      id: 'api-interactive',
      label: 'Interactive API Overview',
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'link',
          label: 'Interactive API (OpenAPI)',
          href: '/api-reference/endpoints',
        },
        'api-reference/request-parameters',
        'api-reference/response-formats',
        'api-reference/error-handling',
        'api-reference/sdks-examples',
        'api-reference/api-troubleshooting',
        'api-reference/performance-metrics',
      ],
    },
    {
      type: 'category',
      label: 'AI Insights',
      items: [
        'ai-insights/ai-concepts',
        'ai-insights/configuring-ai',
        'ai-insights/interpreting-results',
        'ai-insights/use-cases-by-industry',
        'ai-insights/best-practices',
        'ai-insights/ai-limitations',
        'ai-insights/ai-troubleshooting',
        'ai-insights/ai-act-conformity',
      ],
    },
    {
      type: 'category',
      label: 'Functional Modules',
      items: [
        'functional-modules/detection',
        'functional-modules/classification',
        'functional-modules/measurement',
        'functional-modules/report-generation',
        'functional-modules/uncertainly-estimation',
      ],
    },
    {
      type: 'category',
      label: 'Compliance',
      items: [
        'compliance/ethics',
        'compliance/gdpr',
        'compliance/traceability',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'integration/hospital-systems',
        'integration/export-formats',
      ],
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
    {
      type: 'doc',
      id: 'changelog',
      label: 'Changelog',
    }
  ],
};

export default sidebars;
