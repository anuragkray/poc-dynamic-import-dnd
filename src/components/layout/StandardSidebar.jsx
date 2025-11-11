import withSidebar from '../hoc/withSidebar';

// Only Standard user sidebar tabs - IDs 1, 2, 4, 6, 8, 10
const standardTabs = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Statistics' },
  { id: 4, label: 'Calendar' },
  { id: 6, label: 'Tasks' },
  { id: 8, label: 'Team' },
  { id: 10, label: 'Help' }
];

const StandardSidebar = withSidebar(standardTabs);

export default StandardSidebar;
