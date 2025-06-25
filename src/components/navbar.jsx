// NavBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <img src="/images/logo.png" style={{ height: '48px' }} alt="Logo" />
            <span style={{
              fontSize: '24px',
              fontWeight: '600',
              color: darkMode ? '#f9fafb' : '#111827'
            }}>
              Risk Mapping
            </span>
          </Link>

          {/* Desktop navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}>
              <Link
                to="/contato"
                style={{
                  padding: '8px 16px',
                  color: darkMode ? '#d1d5db' : '#6b7280',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = darkMode ? '#f9fafb' : '#111827';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = darkMode ? '#d1d5db' : '#6b7280';
                }}
              >
                Contato
              </Link>
              
              <Link
                to="/sobre"
                style={{
                  padding: '8px 16px',
                  color: darkMode ? '#d1d5db' : '#6b7280',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = darkMode ? '#f9fafb' : '#111827';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = darkMode ? '#d1d5db' : '#6b7280';
                }}
              >
                Sobre
              </Link>
              
            </div>
          </div>

          {/* Right side controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Dark mode toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleDarkMode();
              }}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: `2px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = darkMode ? '#4b5563' : '#e5e7eb';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {darkMode ? (
                <svg style={{ height: '20px', width: '20px', color: '#6b7280', pointerEvents: 'none' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg style={{ height: '20px', width: '20px', color: '#f59e0b', pointerEvents: 'none' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <div style={{ position: 'relative' }} className="md:hidden" ref={menuRef}>
              <button
                onClick={handleMenuToggle}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: `2px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                  backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                  cursor: 'pointer',
                  color: darkMode ? '#f9fafb' : '#374151',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = darkMode ? '#4b5563' : '#e5e7eb';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
                }}
              >
                <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>

              {/* Mobile dropdown menu */}
              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '8px',
                  width: '224px',
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  overflow: 'hidden',
                  zIndex: 50
                }}>
                  <div style={{ padding: '8px 0' }}>
                    <Link
                      to="/contato"
                      style={{
                        display: 'block',
                        padding: '12px 24px',
                        color: darkMode ? '#d1d5db' : '#6b7280',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                      }}
                      onClick={handleLinkClick}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = darkMode ? '#374151' : '#f9fafb';
                        e.target.style.color = darkMode ? '#f9fafb' : '#111827';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = darkMode ? '#d1d5db' : '#6b7280';
                      }}
                    >
                      📧 Contato
                    </Link>
                    <Link
                      to="/sobre"
                      style={{
                        display: 'block',
                        padding: '12px 24px',
                        color: darkMode ? '#d1d5db' : '#6b7280',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                      }}
                      onClick={handleLinkClick}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = darkMode ? '#374151' : '#f9fafb';
                        e.target.style.color = darkMode ? '#f9fafb' : '#111827';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = darkMode ? '#d1d5db' : '#6b7280';
                      }}
                    >
                      🧪 Sobre
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40
          }}
          className="md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;