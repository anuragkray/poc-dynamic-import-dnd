import withHeader from '../hoc/withHeader';

// Only Standard user tabs - IDs 1, 2, 4, 6, 8, 10
const standardTabs = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Analytics' },
  { id: 4, label: 'Settings' },
  { id: 6, label: 'Products' },
  { id: 8, label: 'Inventory' },
  { id: 10, label: 'Support' }
];

const StandardHeader = withHeader(standardTabs);

export default StandardHeader;
