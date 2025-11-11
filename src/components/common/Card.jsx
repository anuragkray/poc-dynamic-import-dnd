import { useState } from 'react';

// Reusable Card Component with interactive features
const Card = ({ id, title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setViewCount(prev => prev + 1);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    alert(`Sharing: ${title}`);
  };

  return (
    <div className={`card-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header">
        <h3>{title}</h3>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
          aria-label="Toggle favorite"
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <div className="card-content">
        <p>{content}</p>
        {isExpanded && (
          <div className="card-details">
            <p><strong>Additional Details:</strong></p>
            <ul>
              <li>Card ID: {id}</li>
              <li>Views: {viewCount}</li>
              <li>Status: {isFavorite ? 'Favorited' : 'Not favorited'}</li>
              <li>Last updated: {new Date().toLocaleDateString()}</li>
            </ul>
          </div>
        )}
      </div>
      <div className="card-footer">
        <div className="card-info">
          <small>Card #{id}</small>
          {viewCount > 0 && <small className="view-count">👁 {viewCount}</small>}
        </div>
        <div className="card-actions">
          <button 
            className="action-btn"
            onClick={handleExpand}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▲ Less' : '▼ More'}
          </button>
          <button 
            className="action-btn"
            onClick={handleShare}
            aria-label="Share"
          >
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
