import withMainContent from '../hoc/withMainContent';

// Only Basic user cards - IDs 1, 3, 6, 9
const basicCards = [
  { id: 1, title: 'Sales Overview', content: 'Track your sales performance and trends.' },
  { id: 3, title: 'Revenue Report', content: 'Monitor revenue streams and growth.' },
  { id: 6, title: 'Team Performance', content: 'Track team productivity and goals.' },
  { id: 9, title: 'Support Tickets', content: 'Manage customer support requests.' }
];

const BasicMainContent = withMainContent(basicCards);

export default BasicMainContent;
