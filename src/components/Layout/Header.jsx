import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { C, FONT } from '../../styles/designTokens';
import {
  LogOut, Menu, X,
  LayoutDashboard, UtensilsCrossed, Users, BarChart3,
  TableProperties, ClipboardList, Music,
  Home, ShoppingBag, Receipt, Banknote, History,
  ChevronDown
} from 'lucide-react';

/* ─── NAV CONFIG POR ROL ─────────────────────────────────────── */
const NAV_CONFIG = {
  admin: {
    label: "Administrador",
    accentColor: C.pink,
    links: [
      { label: "Dashboard",  path: "/dashboard", Icon: LayoutDashboard },
      { label: "Mesas",      path: "/tables",    Icon: TableProperties  },
      { label: "Menú",       path: "/menu",      Icon: UtensilsCrossed  },
      { label: "Usuarios",   path: "/users",     Icon: Users            },
      { label: "Reportes",   path: "/reports",   Icon: BarChart3        },
    ],
  },
  cliente: {
    label: "Cliente",
    accentColor: C.teal,
    links: [
      { label: "Inicio",     path: "/home",      Icon: Home             },
      { label: "Menú",       path: "/menu",      Icon: UtensilsCrossed  },
      { label: "Mi Pedido",  path: "/my-order",  Icon: ShoppingBag      },
      { label: "Canciones",  path: "/songs",     Icon: Music            },
    ],
  },
  mesero: {
    label: "Mesero",
    accentColor: C.orange,
    links: [
      { label: "Mesas",      path: "/tables",    Icon: TableProperties  },
      { label: "Pedidos",    path: "/orders",    Icon: ClipboardList    },
      { label: "Canciones",  path: "/songs",     Icon: Music            },
    ],
  },
  caja: {
    label: "Caja",
    accentColor: C.yellow,
    links: [
      { label: "Pedidos",    path: "/orders",    Icon: Receipt          },
      { label: "Cobros",     path: "/payments",  Icon: Banknote         },
      { label: "Historial",  path: "/history",   Icon: History          },
    ],
  },
};

/* ─── ROLE BADGE COLORS ──────────────────────────────────────── */
const ROLE_STYLES = {
  admin:   { bg: `${C.pink}22`,   border: `${C.pink}55`,   color: C.pink   },
  cliente: { bg: `${C.teal}22`,   border: `${C.teal}55`,   color: C.teal   },
  mesero:  { bg: `${C.orange}22`, border: `${C.orange}55`, color: C.orange },
  caja:    { bg: `${C.yellow}22`, border: `${C.yellow}55`, color: C.yellow },
};

/* ─── HEADER ─────────────────────────────────────────────────── */
const Header = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  // Detecta el rol del usuario (ajusta según tu AuthContext)
  const role   = user?.rol || 'cliente';
  const config = NAV_CONFIG[role] || NAV_CONFIG.cliente;
  const rs     = ROLE_STYLES[role] || ROLE_STYLES.cliente;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const getUserInitial = () =>
    user?.nombre?.charAt(0).toUpperCase() || 'U';

  return (
    <>
      <header style={{
        background: C.bgAccent,
        borderBottom: `1px solid ${C.border}`,
        position: "sticky",
        top: 0,
        zIndex: 200,
        boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
        fontFamily: FONT,
      }}>
        {/* Neon top strip con el color del rol */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, ${config.accentColor}, ${config.accentColor}88, transparent)`,
          boxShadow: `0 0 10px ${config.accentColor}66`,
        }} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          height: "56px",
          gap: "24px",
        }}>

          {/* ── LOGO ── */}
          <div
            onClick={() => handleNav(config.links[0].path)}
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flexShrink: 0 }}
          >
            <div style={{
              width: "34px", height: "34px", borderRadius: "9px",
              background: config.accentColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 10px ${config.accentColor}66`,
            }}>
              <UtensilsCrossed size={17} color="#fff" />
            </div>
            <div>
              <div style={{ color: C.cream, fontWeight: "800", fontSize: "17px", lineHeight: 1, letterSpacing: "0.3px" }}>
                iTaquito
              </div>
              {/* Badge de rol */}
              <div style={{
                display: "inline-flex", alignItems: "center",
                background: rs.bg, border: `1px solid ${rs.border}`,
                color: rs.color, borderRadius: "10px",
                padding: "1px 7px", fontSize: "9px", fontWeight: "700",
                letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px",
              }}>
                {config.label}
              </div>
            </div>
          </div>

          {/* ── NAV DESKTOP ── */}
          <nav style={{
            display: "flex", alignItems: "center", gap: "2px",
            flex: 1,
            // ocultar en móvil via inline (usamos JS para toggle)
          }} className="desktop-nav">
            {config.links.map(({ label, path, Icon }) => {
              const active = isActive(path);
              return (
                <button
                  key={path}
                  onClick={() => handleNav(path)}
                  style={{
                    background: active ? `${config.accentColor}18` : "transparent",
                    color: active ? config.accentColor : C.textSecondary,
                    border: `1px solid ${active ? config.accentColor + "44" : "transparent"}`,
                    borderRadius: "8px",
                    padding: "6px 14px",
                    fontFamily: FONT,
                    fontWeight: "700",
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    boxShadow: active ? `0 0 10px ${config.accentColor}22` : "none",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color = C.textPrimary;
                      e.currentTarget.style.background = `${C.border}`;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.color = C.textSecondary;
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              );
            })}
          </nav>

          {/* ── SPACER ── */}
          <div style={{ flex: 1 }} />

          {/* ── USER MENU ── */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button
              onClick={() => setUserOpen(o => !o)}
              style={{
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: "10px",
                padding: "5px 10px 5px 6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = config.accentColor + "66"}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              {/* Avatar */}
              <div style={{
                width: "28px", height: "28px", borderRadius: "7px",
                background: `${config.accentColor}33`,
                border: `1.5px solid ${config.accentColor}66`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: config.accentColor, fontWeight: "800", fontSize: "13px",
              }}>
                {getUserInitial()}
              </div>
              <span style={{ color: C.textPrimary, fontSize: "13px", fontWeight: "600", fontFamily: FONT }}>
                {user?.nombre || "Usuario"}
              </span>
              <ChevronDown
                size={13}
                color={C.textMuted}
                style={{ transform: userOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
              />
            </button>

            {/* Dropdown */}
            {userOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", right: 0,
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "12px",
                padding: "6px",
                minWidth: "180px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                zIndex: 300,
              }}>
                {/* Info usuario */}
                <div style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${C.border}`, marginBottom: "6px" }}>
                  <div style={{ color: C.textPrimary, fontWeight: "700", fontSize: "13px" }}>
                    {user?.nombre || "Usuario"}
                  </div>
                  <div style={{ color: C.textMuted, fontSize: "11px", marginTop: "2px" }}>
                    {user?.email || ""}
                  </div>
                  <div style={{
                    display: "inline-flex", marginTop: "6px",
                    background: rs.bg, border: `1px solid ${rs.border}`,
                    color: rs.color, borderRadius: "8px",
                    padding: "1px 8px", fontSize: "10px", fontWeight: "700",
                    letterSpacing: "0.8px", textTransform: "uppercase",
                  }}>
                    {config.label}
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%", background: "transparent",
                    border: "none", borderRadius: "8px",
                    padding: "8px 12px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "8px",
                    color: C.pink, fontFamily: FONT, fontWeight: "600",
                    fontSize: "13px", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = `${C.pink}12`}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <LogOut size={14} /> Cerrar sesión
                </button>
              </div>
            )}
          </div>

          {/* ── HAMBURGER (móvil) ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: "transparent",
              border: `1px solid ${C.border}`,
              borderRadius: "8px",
              padding: "6px",
              cursor: "pointer",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              color: C.textPrimary,
              flexShrink: 0,
            }}
            id="hamburger-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "59px", left: 0, right: 0,
          background: C.bgCard,
          borderBottom: `1px solid ${C.border}`,
          zIndex: 199,
          padding: "12px 16px 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          fontFamily: FONT,
        }}>
          {config.links.map(({ label, path, Icon }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => handleNav(path)}
                style={{
                  width: "100%",
                  background: active ? `${config.accentColor}18` : "transparent",
                  color: active ? config.accentColor : C.textSecondary,
                  border: `1px solid ${active ? config.accentColor + "44" : C.border}`,
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "6px",
                  fontFamily: FONT,
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textAlign: "left",
                  boxShadow: active ? `0 0 10px ${config.accentColor}22` : "none",
                }}
              >
                <Icon size={16} /> {label}
              </button>
            );
          })}

          {/* Logout en móvil */}
          <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: `1px solid ${C.border}` }}>
            <button
              onClick={handleLogout}
              style={{
                width: "100%", background: `${C.pink}12`,
                border: `1px solid ${C.pink}33`, borderRadius: "10px",
                padding: "12px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "10px",
                color: C.pink, fontFamily: FONT, fontWeight: "700", fontSize: "14px",
              }}
            >
              <LogOut size={16} /> Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* ── ESTILOS RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          #hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Header;