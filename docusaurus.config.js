// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Neolens API Documentation',
  favicon: 'img/neolens-ai-favicon.png',

  future: {
    v4: true,
  },

  url: 'https://berangeregallais.github.io',
  baseUrl: '/',
  organizationName: 'berangeregallais',
  projectName: 'neolens-docs',
  deploymentBranch: 'master',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',

  stylesheets: [
    '/css/prism-overrides.css', // Prism overrides
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // docs à la racine
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/berangeregallais/neolens-docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: false,
      }),
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            spec: 'static/api/openapi.json',
            route: '/api-reference/endpoints',
          },
        ],
        theme: {
          primaryColor: '#2E8555',
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Neolens AI Documentation',
        logo: {
          alt: 'Neolens AI Logo',
          src: 'img/neolens-ai-logo.svg',
        },
        items: [
          {
            href: 'https://github.com/berangeregallais/neolens-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
              { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
              { label: 'X', href: 'https://x.com/docusaurus' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Neolens. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'php', 'ruby'],
      },
    }),
};

export default config;
