// Reusable Tab Component
const Tab = ({ id, label, isActive, onClick }) => {
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => onClick(id)}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Tab;
