import withHeader from '../hoc/withHeader';

// Only Basic user tabs - IDs 1, 3, 6, 9
const basicTabs = [
  { id: 1, label: 'Dashboard' },
  { id: 3, label: 'Reports' },
  { id: 6, label: 'Products' },
  { id: 9, label: 'Billing' }
];

const BasicHeader = withHeader(basicTabs);

export default BasicHeader;
