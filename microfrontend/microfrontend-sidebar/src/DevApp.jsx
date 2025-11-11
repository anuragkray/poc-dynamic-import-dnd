import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Sidebar from './Sidebar.jsx';
import './styles.css';

// Mock data for standalone development
const mockProps = {
  role: 'premium',
  visibleTabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // All tabs visible for development
};

// Development wrapper component
function DevApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px',
      display: 'flex',
      gap: '20px'
    }}>
      <div style={{ flex: '0 0 250px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: 'fit-content'
        }}>
          <Sidebar {...mockProps} />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>
            🔧 Sidebar Microfrontend - Standalone Development Mode
          </h1>
          <p style={{ margin: '0', color: '#666' }}>
            This is a standalone preview of the Sidebar microfrontend. 
            You can develop and test this component independently without running the host application.
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Current Props:</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
            {JSON.stringify(mockProps, null, 2)}
          </pre>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
            💡 <strong>Tip:</strong> Modify the mockProps object in <code>src/DevApp.jsx</code> to test different scenarios.
          </p>
        </div>
      </div>
    </div>
  );
}

// Mount the dev app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DevApp />
  </StrictMode>
);
