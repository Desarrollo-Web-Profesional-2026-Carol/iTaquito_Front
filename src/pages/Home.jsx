import { useState, useEffect } from "react";
import {
  Utensils, Star, Clock, TrendingUp,
  ChevronRight, Flame, Award,
  Zap, ArrowRight, Heart, ThumbsUp, MessageCircle
} from "lucide-react";

/* ─── TOKENS ─────────────────────────────────────────────────── */
const C = {
  pink: "#E83E8C", pinkDim: "#C0306E",
  orange: "#F9690E", orangeDim: "#C9520A",
  yellow: "#F4D03F",
  teal: "#1ABC9C", tealDim: "#148F77",
  purple: "#9B59B6", purpleDim: "#7D3C98",
  bg: "#0F0D0B", bgCard: "#1A1612", bgCardHov: "#221E18",
  bgAccent: "#251F18", border: "#2E2820", borderBright: "#3D3428",
  cream: "#F5EDD8", textPrimary: "#F0E6D0",
  textSecondary: "#9A8870", textMuted: "#5C5040",
};
const FONT = "'Quicksand', sans-serif";

/* ─── DATA ───────────────────────────────────────────────────── */
const CATEGORIES = [
  { label: "Tacos",      Icon: Utensils, color: C.pink   },
  { label: "Bebidas",    Icon: Zap,      color: C.teal   },
  { label: "Extras",     Icon: Flame,    color: C.orange },
  { label: "Especiales", Icon: Star,     color: C.yellow },
];

const BESTSELLERS = [
  { id: 1, name: "Al Pastor", price: 25, desc: "Cerdo marinado, piña asada, cebolla y cilantro", tag: "#1 Más pedido",  tagIcon: TrendingUp, color: C.pink   },
  { id: 2, name: "Bistec",    price: 28, desc: "Carne asada, guacamole y pico de gallo",          tag: "Favorito del día", tagIcon: Flame,      color: C.orange },
  { id: 3, name: "Suadero",   price: 26, desc: "Suadero dorado, cebolla y salsa verde",            tag: "Clásico",        tagIcon: Award,      color: C.teal   },
];

const REVIEWS = [
  { name: "María G.",  stars: 5, text: "Los tacos de suadero están increíbles. Siempre vuelvo.",       time: "Hace 2 días", color: C.pink   },
  { name: "Carlos R.", stars: 5, text: "Pedí desde la tablet y llegó en 7 min. Sistema rapidísimo.",   time: "Ayer",        color: C.orange },
  { name: "Ana P.",    stars: 4, text: "Me encantó pedir la canción desde la mesa. Experiencia única.", time: "Hoy",         color: C.teal   },
];

const PICADO = [C.pink, C.orange, C.yellow, C.teal, C.purple, C.pinkDim, C.orangeDim, C.tealDim];

/* ─── PAPEL PICADO ───────────────────────────────────────────── */
function PapelPicado({ flip = false }) {
  return (
    <div style={{ width: "100%", lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", flexShrink: 0, overflow: "visible" }}>
      <div style={{ display: "flex", width: "100%", paddingBottom: "6px" }}>
        {Array.from({ length: 26 }).map((_, i) => (
          <div key={i} style={{ flex: 1, width: 0, height: 0, borderLeft: "24px solid transparent", borderRight: "24px solid transparent", borderTop: `36px solid ${PICADO[i % PICADO.length]}`, opacity: 0.9, filter: `drop-shadow(0 3px 2px ${PICADO[i % PICADO.length]}55)` }} />
        ))}
      </div>
    </div>
  );
}

/* ─── NEON DIVIDER ───────────────────────────────────────────── */
function NeonDivider() {
  return <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${C.borderBright}, transparent)` }} />;
}

/* ─── SECTION HEADING ────────────────────────────────────────── */
function SectionHeading({ title, sub, color = C.pink }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
        <div style={{ width: "4px", height: "26px", borderRadius: "4px", background: color, boxShadow: `0 0 8px ${color}` }} />
        <h2 style={{ margin: 0, fontFamily: FONT, fontWeight: "800", fontSize: "clamp(18px,4vw,24px)", color: C.textPrimary }}>{title}</h2>
      </div>
      {sub && <p style={{ margin: "0 0 0 14px", fontFamily: FONT, fontSize: "13px", color: C.textSecondary }}>{sub}</p>}
    </div>
  );
}

/* ─── TACO CARD ──────────────────────────────────────────────── */
function TacoCard({ taco, onTap }) {
  const [hov, setHov] = useState(false);
  const TagIcon = taco.tagIcon;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onTap}
      style={{
        background: hov ? C.bgCardHov : C.bgCard,
        border: `1.5px solid ${hov ? taco.color : C.border}`,
        borderRadius: "16px", overflow: "hidden",
        display: "flex", flexDirection: "column",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 12px 32px rgba(0,0,0,0.4), 0 0 20px ${taco.color}22` : "0 2px 8px rgba(0,0,0,0.3)",
        transition: "all 0.25s ease",
        cursor: "pointer",
      }}
    >
      {/* Franja sarape */}
      <div style={{ height: "6px", background: taco.color, boxShadow: `0 0 12px ${taco.color}66` }} />

      <div style={{ padding: "18px" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: `${taco.color}18`, border: `1px solid ${taco.color}44`, color: taco.color, borderRadius: "20px", padding: "3px 10px", marginBottom: "12px", fontSize: "11px", fontWeight: "700", fontFamily: FONT }}>
          <TagIcon size={11} /> {taco.tag}
        </div>

        {/* Icono */}
        <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: `${taco.color}15`, border: `1.5px solid ${taco.color}33`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
          <Utensils size={24} color={taco.color} />
        </div>

        <h3 style={{ margin: "0 0 6px", fontFamily: FONT, fontWeight: "800", fontSize: "16px", color: C.textPrimary }}>
          Taco de {taco.name}
        </h3>
        <p style={{ margin: "0 0 16px", fontFamily: FONT, fontSize: "12.5px", color: C.textSecondary, lineHeight: "1.55" }}>
          {taco.desc}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: FONT, fontWeight: "800", fontSize: "20px", color: taco.color }}>${taco.price}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ArrowRight size={14} color={taco.color} />
            <span style={{ color: taco.color, fontWeight: "700", fontSize: "12px", fontFamily: FONT }}>Ver menú</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── REVIEW CARD ────────────────────────────────────────────── */
function ReviewCard({ r }) {
  return (
    <div style={{ background: C.bgCard, border: `1.5px solid ${C.border}`, borderLeft: `3px solid ${r.color}`, borderRadius: "14px", padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `${r.color}22`, border: `1.5px solid ${r.color}55`, display: "flex", alignItems: "center", justifyContent: "center", color: r.color, fontWeight: "800", fontSize: "13px", fontFamily: FONT }}>
            {r.name[0]}
          </div>
          <span style={{ fontFamily: FONT, fontWeight: "700", fontSize: "14px", color: C.textPrimary }}>{r.name}</span>
        </div>
        <span style={{ fontFamily: FONT, fontSize: "11px", color: C.textMuted }}>{r.time}</span>
      </div>
      <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={13} color={s <= r.stars ? C.yellow : C.textMuted} fill={s <= r.stars ? C.yellow : "none"} />
        ))}
      </div>
      <p style={{ margin: 0, fontFamily: FONT, fontSize: "13px", color: C.textSecondary, lineHeight: "1.6" }}>"{r.text}"</p>
      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <button style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontFamily: FONT, padding: 0 }}>
          <ThumbsUp size={12} /> Útil
        </button>
        <button style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontFamily: FONT, padding: 0 }}>
          <MessageCircle size={12} /> Responder
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function Home() {
  const [visible,   setVisible]   = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [now,       setNow]       = useState(new Date());

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const h        = now.getHours();
  const greeting = h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches";

  // Con react-router: navigate('/pedidos')
  const irAPedidos = () => alert("Navegando a pantalla de pedidos...");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT, overflowX: "hidden", color: C.textPrimary }}>

      <PapelPicado />

      {/* ── HERO ── */}
      <section style={{ background: C.bg, padding: "60px 24px 56px", textAlign: "center", position: "relative", overflow: "hidden", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ position: "absolute", top: "-80px", left: "10%", width: "300px", height: "300px", borderRadius: "50%", background: `${C.pink}0D`, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", right: "10%", width: "280px", height: "280px", borderRadius: "50%", background: `${C.teal}0D`, filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(.34,1.2,.64,1)", position: "relative" }}>
          {/* Saludo + tiempo de espera */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.borderBright}`, borderRadius: "30px", padding: "6px 16px", marginBottom: "20px", color: C.textSecondary, fontSize: "13px", fontWeight: "600", letterSpacing: "1px" }}>
            <Clock size={13} color={C.yellow} />
            {greeting} · Espera aprox. <strong style={{ color: C.orange }}>~8 min</strong>
          </div>

          <h1 style={{ color: C.cream, fontSize: "clamp(38px,9vw,72px)", fontWeight: "800", margin: "0 0 8px", lineHeight: 1.05, letterSpacing: "-1px" }}>
            Bienvenido a
          </h1>
          <h1 style={{ fontSize: "clamp(38px,9vw,72px)", fontWeight: "800", margin: "0 0 18px", lineHeight: 1.05, letterSpacing: "-1px", color: C.pink }}>
            iTaquito
          </h1>
          <p style={{ color: C.textSecondary, fontSize: "16px", margin: "0 0 36px", fontWeight: "500" }}>
            Explora nuestro menú y realiza tu pedido desde la mesa
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={irAPedidos} style={{ background: C.pink, color: "#fff", border: "none", borderRadius: "12px", padding: "14px 30px", fontFamily: FONT, fontWeight: "800", fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: `0 0 24px ${C.pink}55` }}>
              <Utensils size={16} /> Hacer mi pedido
            </button>
            <button style={{ background: "rgba(255,255,255,0.05)", color: C.textPrimary, border: `1px solid ${C.borderBright}`, borderRadius: "12px", padding: "14px 24px", fontFamily: FONT, fontWeight: "700", fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <Star size={15} color={C.yellow} /> Ver Reseñas
            </button>
          </div>
        </div>
      </section>

      <PapelPicado flip />

      {/* ── MAIN ── */}
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>

        {/* PROMO */}
        <div style={{ background: `${C.pink}18`, border: `1px solid ${C.pink}44`, borderRadius: "16px", padding: "22px 26px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "48px", boxShadow: `0 0 30px ${C.pink}12`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: `${C.pink}08`, filter: "blur(30px)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontWeight: "800", fontSize: "17px", color: C.textPrimary, marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={16} color={C.yellow} /> Promoción del Día
            </div>
            <div style={{ color: C.textSecondary, fontSize: "14px" }}>
              3 tacos al pastor + agua fresca — solo <strong style={{ color: C.yellow }}>$75</strong>
            </div>
          </div>
          <button onClick={irAPedidos} style={{ background: C.yellow, color: C.bg, border: "none", borderRadius: "10px", padding: "11px 22px", fontFamily: FONT, fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: `0 0 16px ${C.yellow}44`, display: "flex", alignItems: "center", gap: "6px" }}>
            Quiero esta promo <ArrowRight size={14} />
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.Icon;
            const active = activeTab === i;
            return (
              <button key={i} onClick={() => setActiveTab(i)} style={{ background: active ? `${cat.color}22` : "transparent", color: active ? cat.color : C.textSecondary, border: `1.5px solid ${active ? cat.color : C.border}`, borderRadius: "10px", padding: "8px 18px", fontFamily: FONT, fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s", boxShadow: active ? `0 0 12px ${cat.color}33` : "none" }}>
                <Icon size={14} /> {cat.label}
              </button>
            );
          })}
        </div>

        {/* BESTSELLERS */}
        <SectionHeading title="Lo Más Pedido Hoy" sub="Toca cualquier taco para comenzar tu pedido" color={C.pink} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px", marginBottom: "52px" }}>
          {BESTSELLERS.map(t => <TacoCard key={t.id} taco={t} onTap={irAPedidos} />)}
        </div>

        <NeonDivider />

        {/* REVIEWS */}
        <div style={{ margin: "48px 0" }}>
          <SectionHeading title="Lo Que Dicen Nuestros Clientes" sub="Opiniones verificadas" color={C.teal} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "14px" }}>
            {REVIEWS.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>
        </div>

      </main>

    </div>
  );
}