import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { C, FONT, glow } from '../styles/designTokens';
import {
  LayoutDashboard, TableProperties, UtensilsCrossed,
  Users, BarChart3, TrendingUp, TrendingDown,
  Clock, CheckCircle, XCircle, AlertCircle,
  ShoppingBag, DollarSign, Star, ArrowRight,
  Activity, RefreshCw
} from 'lucide-react';

/* ─── STAT CARD ──────────────────────────────────────────────── */
function StatCard({ label, value, sub, Icon, color, trend, trendValue }) {
  const [hov, setHov] = useState(false);
  const isUp = trend === 'up';

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.bgCardHov : C.bgCard,
        border: `1.5px solid ${hov ? color : C.border}`,
        borderRadius: "16px",
        padding: "22px",
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? `0 12px 28px rgba(0,0,0,0.3), ${glow(color, "18")}` : "0 2px 8px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Franja top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: color, boxShadow: `0 0 8px ${color}` }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{
          width: "42px", height: "42px", borderRadius: "10px",
          background: `${color}18`, border: `1.5px solid ${color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} color={color} />
        </div>
        {trend && (
          <div style={{
            display: "flex", alignItems: "center", gap: "3px",
            background: isUp ? `${C.teal}18` : `${C.pink}18`,
            border: `1px solid ${isUp ? C.teal : C.pink}44`,
            borderRadius: "20px", padding: "3px 8px",
            color: isUp ? C.teal : C.pink,
            fontSize: "11px", fontWeight: "700",
          }}>
            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trendValue}
          </div>
        )}
      </div>

      <div style={{ color: C.textPrimary, fontSize: "30px", fontWeight: "800", lineHeight: 1, marginBottom: "6px" }}>
        {value}
      </div>
      <div style={{ color: C.textSecondary, fontSize: "13px", fontWeight: "600" }}>{label}</div>
      {sub && <div style={{ color: C.textMuted, fontSize: "11px", marginTop: "4px" }}>{sub}</div>}
    </div>
  );
}

/* ─── ACTIVITY ITEM ──────────────────────────────────────────── */
function ActivityItem({ icon: Icon, color, title, sub, time }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      padding: "10px 0",
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
        background: `${color}18`, border: `1px solid ${color}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={15} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.textPrimary, fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        <div style={{ color: C.textMuted, fontSize: "11px", marginTop: "1px" }}>{sub}</div>
      </div>
      <div style={{ color: C.textMuted, fontSize: "11px", flexShrink: 0 }}>{time}</div>
    </div>
  );
}

/* ─── QUICK ACTION BUTTON ────────────────────────────────────── */
function QuickAction({ label, Icon, color, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${color}22` : `${color}10`,
        border: `1.5px solid ${hov ? color : color + "44"}`,
        borderRadius: "12px", padding: "14px 16px",
        cursor: "pointer", fontFamily: FONT,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        transition: "all 0.2s",
        boxShadow: hov ? glow(color, "22") : "none",
      }}
    >
      <Icon size={22} color={color} />
      <span style={{ color: hov ? color : C.textSecondary, fontSize: "12px", fontWeight: "700" }}>{label}</span>
    </button>
  );
}

/* ─── TABLE STATUS BADGE ─────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    disponible: { color: C.teal,   label: "Disponible" },
    ocupada:    { color: C.orange, label: "Ocupada"    },
    reservada:  { color: C.yellow, label: "Reservada"  },
    inactiva:   { color: C.textMuted, label: "Inactiva" },
  };
  const s = map[status] || map.inactiva;
  return (
    <span style={{
      background: `${s.color}18`, border: `1px solid ${s.color}44`,
      color: s.color, borderRadius: "20px", padding: "2px 9px",
      fontSize: "11px", fontWeight: "700",
    }}>{s.label}</span>
  );
}

/* ─── DASHBOARD ──────────────────────────────────────────────── */
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const h = now.getHours();
  const greeting = h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches";

  // Datos de ejemplo — reemplazar con llamadas reales a la API
  const STATS = [
    { label: "Total Mesas",       value: "24",  sub: "En el establecimiento",    Icon: TableProperties,  color: C.pink,   trend: "up",   trendValue: "+2 esta semana" },
    { label: "Mesas Ocupadas",    value: "14",  sub: "58% de ocupación",         Icon: Users,            color: C.orange, trend: "up",   trendValue: "+3 hoy"         },
    { label: "Mesas Disponibles", value: "8",   sub: "Listas para recibir",      Icon: CheckCircle,      color: C.teal,   trend: null,   trendValue: null              },
    { label: "Pedidos Activos",   value: "21",  sub: "En cocina ahora mismo",    Icon: ShoppingBag,      color: C.yellow, trend: "up",   trendValue: "+5 vs ayer"     },
    { label: "Ventas del Día",    value: "$3,240", sub: "Hasta las " + now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }), Icon: DollarSign, color: C.purple, trend: "up", trendValue: "+12%" },
    { label: "Calificación",      value: "4.8", sub: "Promedio del mes",         Icon: Star,             color: C.yellow, trend: "up",   trendValue: "+0.2"            },
  ];

  const ACTIVITY = [
    { icon: ShoppingBag, color: C.teal,   title: "Pedido #142 confirmado",         sub: "Mesa 7 · 3 tacos al pastor",      time: "Hace 2 min"  },
    { icon: TableProperties, color: C.orange, title: "Mesa 12 ocupada",             sub: "4 personas · Mesero: Carlos",     time: "Hace 5 min"  },
    { icon: DollarSign,  color: C.yellow, title: "Cobro procesado $340",           sub: "Mesa 3 · Tarjeta",                time: "Hace 8 min"  },
    { icon: Star,        color: C.pink,   title: "Nueva reseña ★★★★★",            sub: "\"Excelentes tacos al pastor\"",  time: "Hace 14 min" },
    { icon: CheckCircle, color: C.teal,   title: "Mesa 5 liberada",                sub: "Duración: 42 min",                time: "Hace 20 min" },
    { icon: AlertCircle, color: C.orange, title: "Pedido #138 tardando >15 min",   sub: "Mesa 9 · Revisar cocina",         time: "Hace 22 min" },
  ];

  const MESA_PREVIEW = [
    { num: 1,  cap: 4, status: "ocupada"    },
    { num: 2,  cap: 2, status: "disponible" },
    { num: 3,  cap: 6, status: "ocupada"    },
    { num: 4,  cap: 4, status: "reservada"  },
    { num: 5,  cap: 4, status: "disponible" },
    { num: 6,  cap: 8, status: "ocupada"    },
    { num: 7,  cap: 4, status: "ocupada"    },
    { num: 8,  cap: 2, status: "inactiva"   },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT, color: C.textPrimary }}>
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>

        {/* ── HEADER ROW ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <LayoutDashboard size={18} color={C.pink} />
              <span style={{ color: C.textMuted, fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase" }}>Panel de Control</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(22px,4vw,30px)", fontWeight: "800", color: C.textPrimary, lineHeight: 1.1 }}>
              {greeting}, <span style={{ color: C.pink }}>{user?.nombre || "Admin"}</span>
            </h1>
            <p style={{ margin: "4px 0 0", color: C.textMuted, fontSize: "13px" }}>
              {now.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })} ·{" "}
              {now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: "10px", padding: "8px 16px",
              color: C.textSecondary, fontFamily: FONT, fontWeight: "600",
              fontSize: "13px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.pink; e.currentTarget.style.color = C.pink; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}
          >
            <RefreshCw size={14} style={{ animation: refreshing ? "spin 0.8s linear" : "none" }} />
            Actualizar
          </button>
        </div>

        {/* ── STATS GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {STATS.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* ── ACCIONES RÁPIDAS ── */}
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: C.pink, boxShadow: glow(C.pink) }} />
            <h2 style={{ margin: 0, fontSize: "15px", fontWeight: "800", color: C.textPrimary }}>Acciones Rápidas</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "10px" }}>
            <QuickAction label="Mesas"    Icon={TableProperties}  color={C.pink}   onClick={() => navigate('/tables')}    />
            <QuickAction label="Menú"     Icon={UtensilsCrossed}  color={C.orange} onClick={() => navigate('/menu')}      />
            <QuickAction label="Usuarios" Icon={Users}            color={C.teal}   onClick={() => navigate('/users')}     />
            <QuickAction label="Reportes" Icon={BarChart3}        color={C.yellow} onClick={() => navigate('/reports')}   />
            <QuickAction label="Pedidos"  Icon={ShoppingBag}      color={C.purple} onClick={() => navigate('/orders')}    />
          </div>
        </div>

        {/* ── DOS COLUMNAS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

          {/* Actividad reciente */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: C.teal, boxShadow: glow(C.teal) }} />
                <h2 style={{ margin: 0, fontSize: "15px", fontWeight: "800", color: C.textPrimary }}>Actividad Reciente</h2>
              </div>
              <Activity size={15} color={C.textMuted} />
            </div>
            <div>
              {ACTIVITY.map((a, i) => <ActivityItem key={i} {...a} />)}
            </div>
          </div>

          {/* Estado de mesas */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: C.orange, boxShadow: glow(C.orange) }} />
                <h2 style={{ margin: 0, fontSize: "15px", fontWeight: "800", color: C.textPrimary }}>Estado de Mesas</h2>
              </div>
              <button
                onClick={() => navigate('/tables')}
                style={{ background: "none", border: "none", color: C.pink, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "700", fontFamily: FONT, padding: 0 }}
              >
                Ver todas <ArrowRight size={12} />
              </button>
            </div>

            {/* Leyenda */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
              {[
                { color: C.teal,    label: "Disponible" },
                { color: C.orange,  label: "Ocupada"    },
                { color: C.yellow,  label: "Reservada"  },
                { color: C.textMuted, label: "Inactiva" },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
                  <span style={{ color: C.textMuted, fontSize: "11px" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Grid de mesas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {MESA_PREVIEW.map(({ num, cap, status }) => {
                const colors = { disponible: C.teal, ocupada: C.orange, reservada: C.yellow, inactiva: C.textMuted };
                const col = colors[status];
                return (
                  <div
                    key={num}
                    onClick={() => navigate('/tables')}
                    style={{
                      background: `${col}12`,
                      border: `1.5px solid ${col}44`,
                      borderRadius: "10px",
                      padding: "10px 8px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = col; e.currentTarget.style.background = `${col}20`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${col}44`; e.currentTarget.style.background = `${col}12`; }}
                  >
                    <div style={{ color: col, fontWeight: "800", fontSize: "16px" }}>{num}</div>
                    <div style={{ color: C.textMuted, fontSize: "9px", marginTop: "2px" }}>{cap} pers.</div>
                  </div>
                );
              })}
            </div>

            {/* Resumen ocupación */}
            <div style={{ marginTop: "16px", background: C.bg, borderRadius: "10px", padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ color: C.textSecondary, fontSize: "12px", fontWeight: "600" }}>Ocupación actual</span>
                <span style={{ color: C.orange, fontWeight: "800", fontSize: "13px" }}>58%</span>
              </div>
              <div style={{ height: "6px", background: C.border, borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "58%", height: "100%", background: C.orange, borderRadius: "4px", boxShadow: glow(C.orange, "66") }} />
              </div>
            </div>
          </div>

        </div>

      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Dashboard;