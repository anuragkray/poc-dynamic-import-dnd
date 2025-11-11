import Card from '../common/Card';

const BasicMainContent = ({ visibleCards }) => {
  // Only Basic user cards - IDs 1, 3, 6, 9
  const allCards = [
    { id: 1, title: 'Sales Overview', content: 'Track your sales performance and trends.' },
    { id: 3, title: 'Revenue Report', content: 'Monitor revenue streams and growth.' },
    { id: 6, title: 'Team Performance', content: 'Track team productivity and goals.' },
    { id: 9, title: 'Support Tickets', content: 'Manage customer support requests.' }
  ];

  const displayCards = allCards.filter(card => visibleCards.includes(card.id));

  console.log('🔷 BASIC MAIN CONTENT - Loaded and Rendering:');
  console.log('  → Only Basic cards code downloaded');
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

export default BasicMainContent;
