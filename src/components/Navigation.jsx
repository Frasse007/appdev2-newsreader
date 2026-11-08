import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { savedArticles } = useArticles();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            {/* ⚠️ SECURITY ISSUE: No authentication required to access saved articles */}
            <Link 
              to="/saved" 
              className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
            >
              Saved Articles ({savedArticles.length})
            </Link>
          </div>
        </div>
        <div className="nav-user">
          {isAuthenticated() ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="user-welcome">
                {user.username} ({user.role})
              </span>
              <button 
                onClick={logout} 
                className="logout-btn"
                style={{ cursor: 'pointer', padding: '6px 12px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;