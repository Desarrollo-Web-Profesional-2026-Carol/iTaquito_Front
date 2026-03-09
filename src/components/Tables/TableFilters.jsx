import { useState } from 'react';
import { C, FONT, glow } from '../../styles/designTokens';
import { Search, X } from 'lucide-react';

/* ─── SELECT OSCURO ──────────────────────────────────────────── */
function DarkSelect({ name, value, onChange, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        background:   C.bg,
        border:       `1.5px solid ${focused ? C.pink : C.border}`,
        borderRadius: "10px",
        padding:      "9px 36px 9px 14px",
        color:         value ? C.textPrimary : C.textMuted,
        fontFamily:    FONT,
        fontWeight:   "600",
        fontSize:     "13px",
        cursor:       "pointer",
        outline:      "none",
        appearance:   "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C5040' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat:   "no-repeat",
        backgroundPosition: "calc(100% - 12px) center",
        transition:   "border-color 0.18s, box-shadow 0.18s",
        boxShadow:    focused ? glow(C.pink, "18") : "none",
        minWidth:     "160px",
        flexShrink:    0,
      }}
    >
      {children}
    </select>
  );
}

/* ─── TABLE FILTERS ──────────────────────────────────────────── */
const TableFilters = ({ filters, onFilterChange }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const clearSearch = () => onFilterChange({ ...filters, sNombre: '' });

  const hasActiveFilters =
    filters.sNombre || filters.sUbicacion || filters.sEstado || filters.iCapacidad;

  const clearAll = () => onFilterChange({});

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", width: "100%" }}>

      {/* ── Buscador ── */}
      <div style={{
        flex:         "1 1 220px",
        position:     "relative",
        display:      "flex",
        alignItems:   "center",
      }}>
        <Search
          size={15}
          color={searchFocused ? C.pink : C.textMuted}
          style={{ position: "absolute", left: "12px", pointerEvents: "none", transition: "color 0.18s" }}
        />
        <input
          type="text"
          name="sNombre"
          value={filters.sNombre || ''}
          onChange={handleChange}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Buscar mesa..."
          style={{
            width:        "100%",
            background:    C.bg,
            border:       `1.5px solid ${searchFocused ? C.pink : C.border}`,
            borderRadius: "10px",
            padding:      "9px 36px 9px 36px",
            color:         C.textPrimary,
            fontFamily:    FONT,
            fontWeight:   "600",
            fontSize:     "13px",
            outline:      "none",
            transition:   "border-color 0.18s, box-shadow 0.18s",
            boxShadow:    searchFocused ? glow(C.pink, "18") : "none",
          }}
        />
        {/* Limpiar búsqueda */}
        {filters.sNombre && (
          <button
            onClick={clearSearch}
            style={{
              position: "absolute", right: "10px",
              background: "none", border: "none",
              cursor: "pointer", padding: "2px",
              color: C.textMuted, display: "flex",
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Ubicación ── */}
      <DarkSelect name="sUbicacion" value={filters.sUbicacion || ''} onChange={handleChange}>
        <option value="">Ubicación</option>
        <option value="interior">Interior</option>
        <option value="exterior">Exterior</option>
        <option value="terraza">Terraza</option>
        <option value="vip">VIP</option>
      </DarkSelect>

      {/* ── Estado ── */}
      <DarkSelect name="sEstado" value={filters.sEstado || ''} onChange={handleChange}>
        <option value="">Estado</option>
        <option value="disponible">Disponible</option>
        <option value="ocupada">Ocupada</option>
        <option value="reservada">Reservada</option>
        <option value="inactiva">Inactiva</option>
      </DarkSelect>

      {/* ── Capacidad ── */}
      <DarkSelect name="iCapacidad" value={filters.iCapacidad || ''} onChange={handleChange}>
        <option value="">Capacidad</option>
        <option value="2">2 personas</option>
        <option value="4">4 personas</option>
        <option value="6">6 personas</option>
        <option value="8">8+ personas</option>
      </DarkSelect>

      {/* ── Limpiar todos ── */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          style={{
            background:   `${C.pink}12`,
            border:       `1.5px solid ${C.pink}44`,
            borderRadius: "10px",
            padding:      "8px 14px",
            color:         C.pink,
            fontFamily:    FONT,
            fontWeight:   "700",
            fontSize:     "12px",
            cursor:       "pointer",
            display:      "flex",
            alignItems:   "center",
            gap:          "5px",
            whiteSpace:   "nowrap",
            transition:   "all 0.18s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${C.pink}22`; e.currentTarget.style.borderColor = C.pink; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${C.pink}12`; e.currentTarget.style.borderColor = `${C.pink}44`; }}
        >
          <X size={12} /> Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default TableFilters;