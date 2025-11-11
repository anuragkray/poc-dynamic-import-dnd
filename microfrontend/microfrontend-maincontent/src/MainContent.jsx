import Card from './components/Card';
import './styles.css';

// All possible cards for all roles
const allCards = [
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

const MainContent = ({ role, visibleCards }) => {
  const displayCards = allCards.filter(card => visibleCards.includes(card.id));

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Dashboard</h2>
      </div>
      <div className="cards-grid">
        {displayCards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
          />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
