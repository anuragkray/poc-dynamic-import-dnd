import withSidebar from '../hoc/withSidebar';

// Only Basic user sidebar tabs - IDs 1, 3, 6, 9
const basicTabs = [
  { id: 1, label: 'Overview' },
  { id: 3, label: 'Documents' },
  { id: 6, label: 'Tasks' },
  { id: 9, label: 'Resources' }
];

const BasicSidebar = withSidebar(basicTabs);

export default BasicSidebar;
