import React from 'react';
import { C, FONT } from '../../styles/designTokens';
import {
  Heart, Github, Mail, MapPin, Phone,
  UtensilsCrossed, ChevronRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: C.bgAccent,  // Mismo fondo que el Header
      borderTop: `1px solid ${C.border}`,
      fontFamily: FONT,
      color: C.textPrimary,
      marginTop: 'auto',
    }}>
      {/* Neon top strip - como en el Header */}
      <div style={{
        height: "3px",
        background: `linear-gradient(90deg, ${C.pink}, ${C.orange}, ${C.yellow}, ${C.teal}, ${C.purple})`,
        boxShadow: `0 0 10px ${C.pink}66`,
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px 32px',
      }}>
        {/* Grid principal - mismo espaciado que Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          
          {/* Columna 1: Logo y descripción */}
          <div>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '16px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: "38px", height: "38px", borderRadius: "9px",
                background: `linear-gradient(135deg, ${C.pink}, ${C.purple})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 10px ${C.pink}66`,
              }}>
                <UtensilsCrossed size={18} color="#fff" />
              </div>
              <div>
                <div style={{ 
                  color: C.cream, 
                  fontWeight: "800", 
                  fontSize: "17px", 
                  lineHeight: 1, 
                  letterSpacing: "0.3px" 
                }}>
                  iTaquito
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center",
                  background: `${C.teal}22`, border: `1px solid ${C.teal}55`,
                  color: C.teal, borderRadius: "10px",
                  padding: "1px 7px", fontSize: "9px", fontWeight: "700",
                  letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px",
                }}>
                
                </div>
              </div>
            </div>
            
            <p style={{
              color: C.textSecondary,
              fontSize: '13px',
              lineHeight: '1.6',
              marginBottom: '20px',
              maxWidth: '280px',
            }}>
            
            </p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { Icon: Github, href: 'https://github.com', color: '#fff' },
                { Icon: Mail, href: 'mailto:info@itaquito.com', color: C.pink },
              ].map(({ Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',  // Cuadrado con bordes redondeados como el Header
                    background: C.bgCard,
                    border: `1px solid ${C.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: C.textSecondary,
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = color === C.pink ? `${C.pink}22` : `${C.pink}22`;
                    e.currentTarget.style.borderColor = C.pink;
                    e.currentTarget.style.color = C.pink;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = C.bgCard;
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.color = C.textSecondary;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 style={{
              color: C.textPrimary,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Enlaces rápidos
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Inicio', path: '/' },
                { label: 'Mesas', path: '/tables' },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Reportes', path: '/reports' },
              ].map((link) => (
                <li key={link.label} style={{ marginBottom: '12px' }}>
                  <a
                    href={link.path}
                    style={{
                      color: C.textSecondary,
                      textDecoration: 'none',
                      fontSize: '13px',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = C.pink;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = C.textSecondary;
                    }}
                  >
                    <ChevronRight size={12} color={C.pink} style={{ opacity: 0.7 }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 style={{
              color: C.textPrimary,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Contacto
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px', 
                marginBottom: '16px',
                color: C.textSecondary,
                fontSize: '13px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '7px',
                  background: `${C.pink}15`, border: `1px solid ${C.pink}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <MapPin size={13} color={C.pink} />
                </div>
                <span style={{ lineHeight: '1.5' }}>
....                </span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '16px',
                color: C.textSecondary,
                fontSize: '13px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '7px',
                  background: `${C.orange}15`, border: `1px solid ${C.orange}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Phone size={13} color={C.orange} />
                </div>
                <span>+52 (00)00000</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                color: C.textSecondary,
                fontSize: '13px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '7px',
                  background: `${C.teal}15`, border: `1px solid ${C.teal}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Mail size={13} color={C.teal} />
                </div>
                <span>email</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Horarios */}
          <div>
            <h4 style={{
              color: C.textPrimary,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Horarios
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '12px',
                color: C.textSecondary,
                fontSize: '13px',
              }}>
                <span style={{ color: C.textPrimary, fontWeight: '600' }}>Lun - Jue</span>
                <span>00:00 - 00:00</span>
              </li>
              <li style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '12px',
                color: C.textSecondary,
                fontSize: '13px',
              }}>
                <span style={{ color: C.textPrimary, fontWeight: '600' }}>Vie - Sáb</span>
                <span>00:00 - 00:00</span>
              </li>
              <li style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '12px',
                color: C.textSecondary,
                fontSize: '13px',
              }}>
                <span style={{ color: C.textPrimary, fontWeight: '600' }}>Domingo</span>
                <span>00:00 - 00:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior - como en el Header */}
        <div style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            color: C.textMuted,
            fontSize: '12px',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            © {currentYear} iTaquito. Todos los derechos reservados.
          </p>
          <p style={{
            color: C.textMuted,
            fontSize: '12px',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;