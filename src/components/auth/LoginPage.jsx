import { useState } from 'react';
import { ROLES } from '../../config/roleConfig';

const LoginPage = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Define valid credentials for each role
  const validCredentials = {
    [ROLES.BASIC]: { username: 'basic', password: 'basic123' },
    [ROLES.STANDARD]: { username: 'standard', password: 'standard123' },
    [ROLES.PREMIUM]: { username: 'premium', password: 'premium123' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    if (!selectedRole) {
      setError('Please select a user type');
      return;
    }

    // Validate credentials against the selected role
    const validCreds = validCredentials[selectedRole];
    if (username !== validCreds.username || password !== validCreds.password) {
      setError('Invalid username or password for the selected user type');
      return;
    }

    // Clear error and proceed with login
    setError('');
    onLogin(selectedRole, username);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Welcome to Dynamic App</h1>
          <p>Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Select User Type</label>
            <div className="role-selection">
              <div
                className={`role-card ${
                  selectedRole === ROLES.BASIC ? "selected" : ""
                }`}
                onClick={() => setSelectedRole(ROLES.BASIC)}
              >
                <div className="role-icon">👤</div>
                <h3>Basic User</h3>
                <p>Limited access to essential features</p>
                <ul>
                  <li>4 Header tabs</li>
                  <li>4 Sidebar tabs</li>
                  <li>4 Content cards</li>
                </ul>
              </div>

              <div
                className={`role-card ${
                  selectedRole === ROLES.STANDARD ? "selected" : ""
                }`}
                onClick={() => setSelectedRole(ROLES.STANDARD)}
              >
                <div className="role-icon">⭐</div>
                <h3>Standard User</h3>
                <p>Enhanced access to more features</p>
                <ul>
                  <li>6 Header tabs</li>
                  <li>6 Sidebar tabs</li>
                  <li>6 Content cards</li>
                </ul>
              </div>

              <div
                className={`role-card ${
                  selectedRole === ROLES.PREMIUM ? "selected" : ""
                }`}
                onClick={() => setSelectedRole(ROLES.PREMIUM)}
              >
                <div className="role-icon">👑</div>
                <h3>Premium User</h3>
                <p>Full access to all features</p>
                <ul>
                  <li>10 Header tabs</li>
                  <li>10 Sidebar tabs</li>
                  <li>12 Content cards</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
