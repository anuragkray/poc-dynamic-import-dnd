import withMainContent from '../hoc/withMainContent';

// Only Standard user cards - IDs 1, 2, 4, 6, 8, 10
const standardCards = [
  { id: 1, title: 'Sales Overview', content: 'Track your sales performance and trends.' },
  { id: 2, title: 'Customer Insights', content: 'Analyze customer behavior and preferences.' },
  { id: 4, title: 'Marketing Metrics', content: 'Measure campaign effectiveness.' },
  { id: 6, title: 'Team Performance', content: 'Track team productivity and goals.' },
  { id: 8, title: 'Financial Summary', content: 'Review financial health and forecasts.' },
  { id: 10, title: 'User Activity', content: 'Track user engagement and sessions.' }
];

const StandardMainContent = withMainContent(standardCards);

export default StandardMainContent;
