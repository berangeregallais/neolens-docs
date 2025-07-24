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
    '0-overview',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        '1-getting-started/quickstart',
        '1-getting-started/authentication',
        '1-getting-started/rate-limiting',
      ],
    },
    {
      type: 'doc',
      id: 'api-interactive',
      label: 'Interactive API Overview',
    },
    {
      type: 'link',
      label: 'Try It Now (Interactive API)',
      href: '/api/interactive',
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        '2-api-reference/endpoints',
        '2-api-reference/request-parameters',
        '2-api-reference/response-formats',
        '2-api-reference/error-handling',
        '2-api-reference/sdks-examples',
        '2-api-reference/api-troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'AI Insights',
      items: [
        '3-ai-insights/ai-concepts',
        '3-ai-insights/configuring-ai',
        '3-ai-insights/interpreting-results',
        '3-ai-insights/use-cases-by-industry',
        '3-ai-insights/best-practices',
        '3-ai-insights/ai-limitations',
        '3-ai-insights/ai-troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Functional Modules',
      items: [
        '4-functional-modules/detection',
        '4-functional-modules/classification',
        '4-functional-modules/measurement',
        '4-functional-modules/report-generation',
        '4-functional-modules/uncertainly-estimation',
      ],
    },
    {
      type: 'category',
      label: 'Compliance',
      items: [
        '5-compliance/ethics',
        '5-compliance/gdpr',
        '5-compliance/traceability',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        '6-integration/hospital-systems',
        '6-integration/export-formats',
      ],
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
  ],
};

export default sidebars;
