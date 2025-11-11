import { ROLES } from '../../config/roleConfig';

const RoleSelector = ({ currentRole, onRoleChange }) => {
  return (
    <div className="role-selector">
      <h3>Select User Role</h3>
      <div className="role-buttons">
        <button
          className={`role-btn ${currentRole === ROLES.BASIC ? 'active' : ''}`}
          onClick={() => onRoleChange(ROLES.BASIC)}
        >
          Basic User
        </button>
        <button
          className={`role-btn ${currentRole === ROLES.STANDARD ? 'active' : ''}`}
          onClick={() => onRoleChange(ROLES.STANDARD)}
        >
          Standard User
        </button>
        <button
          className={`role-btn ${currentRole === ROLES.PREMIUM ? 'active' : ''}`}
          onClick={() => onRoleChange(ROLES.PREMIUM)}
        >
          Premium User
        </button>
      </div>
      <p className="role-info">
        Current Role: <strong>{currentRole.toUpperCase()}</strong>
      </p>
    </div>
  );
};

export default RoleSelector;
