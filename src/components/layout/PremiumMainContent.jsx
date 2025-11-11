import Card from '../common/Card';

const PremiumMainContent = ({ visibleCards }) => {
  // All cards for Premium users - IDs 1-12
  const allCards = [
    { id: 1, title: 'Sales Overview', content: 'Track your sales performance and trends.' },
    { id: 2, title: 'Customer Insights', content: 'Analyze customer behavior and preferences.' },
    { id: 3, title: 'Revenue Report', content: 'Monitor revenue streams and growth.' },
    { id: 4, title: 'Marketing Metrics', content: 'Measure campaign effectiveness.' },
    { id: 5, title: 'Product Analytics', content: 'View product performance data.' },
    { id: 6, title: 'Team Performance', content: 'Track team productivity and goals.' },
    { id: 7, title: 'Inventory Status', content: 'Monitor stock levels and alerts.' },
    { id: 8, title: 'Financial Summary', content: 'Review financial health and forecasts.' },
    { id: 9, title: 'Support Tickets', content: 'Manage customer support requests.' },
    { id: 10, title: 'User Activity', content: 'Track user engagement and sessions.' },
    { id: 11, title: 'System Health', content: 'Monitor system performance metrics.' },
    { id: 12, title: 'Recent Updates', content: 'View latest changes and notifications.' }
  ];

  const displayCards = allCards.filter(card => visibleCards.includes(card.id));

  console.log('🔷 PREMIUM MAIN CONTENT - Loaded and Rendering:');
  console.log('  → All Premium cards code downloaded');
  console.log('  → Rendering Cards:', displayCards.map(c => `${c.id}: ${c.title}`));
  console.log('  → Total Cards Rendered:', displayCards.length);

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

export default PremiumMainContent;
