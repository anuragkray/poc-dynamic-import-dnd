import withSidebar from '../hoc/withSidebar';

// All sidebar tabs for Premium users - IDs 1-10
const premiumTabs = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Statistics' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Calendar' },
  { id: 5, label: 'Messages' },
  { id: 6, label: 'Tasks' },
  { id: 7, label: 'Projects' },
  { id: 8, label: 'Team' },
  { id: 9, label: 'Resources' },
  { id: 10, label: 'Help' }
];

const PremiumSidebar = withSidebar(premiumTabs);

export default PremiumSidebar;
