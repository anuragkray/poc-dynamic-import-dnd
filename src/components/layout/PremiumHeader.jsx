import withHeader from '../hoc/withHeader';

// All tabs for Premium users - IDs 1-10
const premiumTabs = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  { id: 3, label: 'Reports' },
  { id: 4, label: 'Settings' },
  { id: 5, label: 'Users' },
  { id: 6, label: 'Products' },
  { id: 7, label: 'Orders' },
  { id: 8, label: 'Inventory' },
  { id: 9, label: 'Billing' },
  { id: 10, label: 'Support' }
];

const PremiumHeader = withHeader(premiumTabs);

export default PremiumHeader;
