import Card from '../common/Card';

// Higher-Order Component for MainContent
const withMainContent = (cards) => {
  return function MainContent({ visibleCards }) {
    const displayCards = cards.filter(card => visibleCards.includes(card.id));

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
};

export default withMainContent;
