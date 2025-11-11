/**
 * Shared Navigation Configuration
 * This file contains all navigation data (tabs, cards, etc.) for all microfrontends
 * Centralized configuration makes it easier to manage and update
 */

// All available header tabs
export const ALL_HEADER_TABS = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  { id: 3, label: 'Reports' },
  { id: 4, label: 'Settings' },
  { id: 5, label: 'Projects' },
  { id: 6, label: 'Products' },
  { id: 7, label: 'Team' },
  { id: 8, label: 'Users' },
  { id: 9, label: 'Billing' },
  { id: 10, label: 'Help' }
];

// All available sidebar tabs
export const ALL_SIDEBAR_TABS = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Projects' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Calendar' },
  { id: 5, label: 'Reports' },
  { id: 6, label: 'Tasks' },
  { id: 7, label: 'Team' },
  { id: 8, label: 'Messages' },
  { id: 9, label: 'Resources' },
  { id: 10, label: 'Settings' }
];

// All available main content cards
export const ALL_CONTENT_CARDS = [
  { id: 1, title: 'Sales Overview', content: 'Track your sales performance and trends.' },
  { id: 2, title: 'Customer Analytics', content: 'Analyze customer behavior and patterns.' },
  { id: 3, title: 'Revenue Report', content: 'Monitor revenue streams and growth.' },
  { id: 4, title: 'Inventory Status', content: 'Monitor stock levels and inventory.' },
  { id: 5, title: 'Project Timeline', content: 'Track project milestones and deadlines.' },
  { id: 6, title: 'Team Performance', content: 'Track team productivity and goals.' },
  { id: 7, title: 'Quality Metrics', content: 'Monitor quality standards and KPIs.' },
  { id: 8, title: 'Marketing Campaigns', content: 'Manage and track marketing efforts.' },
  { id: 9, title: 'Support Tickets', content: 'Manage customer support requests.' },
  { id: 10, title: 'Financial Reports', content: 'View financial summaries and reports.' },
  { id: 11, title: 'User Engagement', content: 'Track user activity and engagement.' },
  { id: 12, title: 'System Health', content: 'Monitor system performance and uptime.' }
];

/**
 * Get filtered items based on visible IDs
 * @param {Array} allItems - All available items
 * @param {Array} visibleIds - IDs of items to show
 * @returns {Array} Filtered items
 */
export const getVisibleItems = (allItems, visibleIds) => {
  return allItems.filter(item => visibleIds.includes(item.id));
};

/**
 * Get items by role (if you want role-based filtering)
 * @param {Array} allItems - All available items
 * @param {string} role - User role (basic, standard, premium)
 * @param {Object} roleConfig - Configuration mapping roles to IDs
 * @returns {Array} Filtered items for the role
 */
export const getItemsByRole = (allItems, role, roleConfig) => {
  const visibleIds = roleConfig[role] || [];
  return getVisibleItems(allItems, visibleIds);
};
