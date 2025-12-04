import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import "./Navbar.css";

// ==================== TYPES ====================
interface NavItem {
  id: string;
  label: string;
  link: string;
  icon: React.ReactNode;
}

// ==================== ICONS ====================
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const ServicesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const PortfolioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 3h6v4" />
    <path d="m22 7-10-4-10 4" />
  </svg>
);

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ==================== NAVIGATION DATA ====================
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', link: '/', icon: <HomeIcon /> },
  { id: 'Epreuves', label: 'Epreuves', link: '/Epreuves', icon: <AboutIcon /> },
  { id: 'Classement', label: 'Classement', link: '/Classement', icon: <ServicesIcon /> },
  { id: 'Champion', label: 'Champion', link: '/Champion', icon: <PortfolioIcon /> },
  { id: 'Planning', label: 'Planning', link: '/Planning', icon: <ContactIcon /> },
];

// ==================== NAVBAR COMPONENT ====================
const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Fonction pour vérifier si un lien est actif
  const isActive = (link: string): boolean => {
    return location.pathname === link;
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close on resize > 992px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Fermer le menu mobile lors d'un changement de page
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar">
          <Link to="/" className="navbar-brand">
            <div className="logo-icon" />
            <span className="brand-text">Agon</span>
          </Link>

          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  to={item.link}
                  className={`nav-link ${isActive(item.link) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="hamburger">
              <span /><span /><span />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-menu-brand">
            <div className="logo-icon" />
            <span className="brand-text">Agon</span>
          </Link>
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>×</button>
        </div>

        <ul className="mobile-menu-nav">
          {navItems.map((item) => (
            <li key={item.id} className="mobile-menu-item">
              <Link
                to={item.link}
                className={`mobile-menu-link ${isActive(item.link) ? 'active' : ''}`}
              >
                <span className="mobile-menu-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;