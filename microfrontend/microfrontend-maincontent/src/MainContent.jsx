import Card from './components/Card';
import { ALL_CONTENT_CARDS, getVisibleItems } from '../../shared/config/navigationConfig';
import './styles.css';

const MainContent = ({ role, visibleCards }) => {
  const displayCards = getVisibleItems(ALL_CONTENT_CARDS, visibleCards);

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
