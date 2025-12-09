import { Link } from 'react-router-dom';
import './Layout.css';

/**
 * Komponen Layout - Wrapper untuk halaman dengan navigasi
 */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            📚 Perpustakaan Pribadi
          </Link>
          <div className="nav-menu">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/stats" className="nav-link">
              Statistik
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2024 Perpustakaan Pribadi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
