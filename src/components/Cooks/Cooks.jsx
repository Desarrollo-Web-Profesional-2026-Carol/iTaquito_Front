import { useState, useEffect } from 'react';
// ✅ Correcto
import { useAuth } from '../../context/AuthContext';
import { C, FONT, glow } from '../../styles/designTokens';
import {
  Users, Pencil, PowerOff, RotateCcw,
  Sun, Clock, Moon, Star,
  Search, X, Save, ChefHat, AlertTriangle
} from 'lucide-react';
import Button from '../UI/Button';

/* ─── CONFIGS ────────────────────────────────────────────────── */
const STATUS = {
  activo:   { color: C.teal,     label: "Activo"   },
  inactivo: { color: C.textMuted, label: "Inactivo" },
};

const TURNO = {
  mañana: { Icon: Sun,   label: "Mañana" },
  tarde:  { Icon: Clock, label: "Tarde"  },
  noche:  { Icon: Moon,  label: "Noche"  },
};

/* ─── ACTION BUTTON ──────────────────────────────────────────── */
function ActionBtn({ label, Icon, color, onClick, fullWidth = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1",
        background:     hov ? `${color}22` : `${color}12`,
        border:         `1.5px solid ${hov ? color : color + "44"}`,
        borderRadius:   "9px",
        padding:        "8px 12px",
        color,
        fontFamily:     FONT,
        fontWeight:     "700",
        fontSize:       "12px",
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "5px",
        transition:     "all 0.18s ease",
        boxShadow:      hov ? glow(color, "22") : "none",
      }}
    >
      <Icon size={13} /> {label}
    </button>
  );
}

/* ─── COOKS CARD ─────────────────────────────────────────────── */
export const CooksCard = ({ cook, onEdit, onDelete, onStatusChange }) => {
  const { user } = useAuth();
  const isAdmin = user?.rol === 'admin';
  const [hov, setHov] = useState(false);

  const st = STATUS[cook.bActivo ? 'activo' : 'inactivo'];
  const tr = TURNO[cook.sTurno?.toLowerCase()] || { Icon: Clock, label: cook.sTurno };
  const TrIcon = tr.Icon;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:    hov ? C.bgCardHov : C.bgCard,
        border:        `1.5px solid ${hov ? st.color : C.border}`,
        borderRadius:  "16px",
        overflow:      "hidden",
        display:       "flex",
        flexDirection: "column",
        transform:     hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow:     hov
          ? `0 12px 32px rgba(0,0,0,0.35), ${glow(st.color, "18")}`
          : "0 2px 8px rgba(0,0,0,0.25)",
        transition: "all 0.22s ease",
        fontFamily: FONT,
      }}
    >
      <div style={{ height: "4px", background: st.color, boxShadow: `0 0 8px ${st.color}` }} />
      <div style={{ padding: "18px 18px 16px" }}>

        {/* Nombre + Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <h3 style={{ margin: 0, color: C.textPrimary, fontWeight: "800", fontSize: "17px", lineHeight: 1.2 }}>
            {cook.sNombre} {cook.sApellido}
          </h3>
          <span style={{
            background:   `${st.color}18`,
            border:       `1px solid ${st.color}55`,
            color:         st.color,
            borderRadius: "20px",
            padding:      "3px 10px",
            fontSize:     "11px",
            fontWeight:   "700",
            letterSpacing:"0.4px",
            whiteSpace:   "nowrap",
            flexShrink:    0,
            marginLeft:   "10px",
          }}>
            {st.label}
          </span>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
          {/* Especialidad */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: C.textSecondary, fontSize: "13px" }}>
            <div style={{
              width: "26px", height: "26px", borderRadius: "7px",
              background: `${C.pink}15`, border: `1px solid ${C.pink}30`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <ChefHat size={13} color={C.pink} />
            </div>
            <span>{cook.sEspecialidad}</span>
          </div>

          {/* Turno */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: C.textSecondary, fontSize: "13px" }}>
            <div style={{
              width: "26px", height: "26px", borderRadius: "7px",
              background: `${C.teal}15`, border: `1px solid ${C.teal}30`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <TrIcon size={13} color={C.teal} />
            </div>
            <span>{tr.label}</span>
          </div>

          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: C.textMuted, fontSize: "12px" }}>
            <span style={{ paddingLeft: "34px" }}>{cook.sEmail}</span>
          </div>
        </div>

        {/* Acciones */}
        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          {isAdmin && (
            <>
              {cook.bActivo && (
                <ActionBtn label="Editar" Icon={Pencil} color={C.teal} onClick={() => onEdit(cook)} />
              )}
              {cook.bActivo ? (
                <ActionBtn label="Desactivar" Icon={PowerOff} color={C.textMuted} onClick={() => onDelete(cook.id)} />
              ) : (
                <ActionBtn label="Reactivar" Icon={RotateCcw} color={C.teal} onClick={() => onStatusChange(cook.id, true)} fullWidth />
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

/* ─── SELECT OSCURO ──────────────────────────────────────────── */
function DarkSelect({ name, value, onChange, children, minWidth = "160px" }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      name={name} value={value} onChange={onChange}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        background:   C.bg,
        border:       `1.5px solid ${focused ? C.pink : C.border}`,
        borderRadius: "10px",
        padding:      "9px 36px 9px 14px",
        color:         value ? C.textPrimary : C.textMuted,
        fontFamily:    FONT, fontWeight: "600", fontSize: "13px",
        cursor:       "pointer", outline: "none",
        appearance: "none", WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C5040' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(100% - 12px) center",
        transition:   "border-color 0.18s, box-shadow 0.18s",
        boxShadow:    focused ? glow(C.pink, "18") : "none",
        minWidth,
        flexShrink: 0,
      }}
    >
      {children}
    </select>
  );
}

/* ─── COOKS FILTERS ──────────────────────────────────────────── */
export const CooksFilters = ({ filters, onFilterChange }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const hasActive = filters.sNombre || filters.sEspecialidad || filters.sTurno;

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", width: "100%" }}>

      {/* Buscador nombre */}
      <div style={{ flex: "1 1 220px", position: "relative", display: "flex", alignItems: "center" }}>
        <Search size={15} color={searchFocused ? C.pink : C.textMuted}
          style={{ position: "absolute", left: "12px", pointerEvents: "none", transition: "color 0.18s" }}
        />
        <input
          type="text" name="sNombre" value={filters.sNombre || ''}
          onChange={handleChange}
          onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
          placeholder="Buscar cocineros..."
          style={{
            width: "100%", background: C.bg,
            border: `1.5px solid ${searchFocused ? C.pink : C.border}`,
            borderRadius: "10px", padding: "9px 36px 9px 36px",
            color: C.textPrimary, fontFamily: FONT, fontWeight: "600", fontSize: "13px",
            outline: "none", transition: "border-color 0.18s, box-shadow 0.18s",
            boxShadow: searchFocused ? glow(C.pink, "18") : "none",
          }}
        />
        {filters.sNombre && (
          <button onClick={() => onFilterChange({ ...filters, sNombre: '' })}
            style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", color: C.textMuted, display: "flex" }}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Especialidad */}
      <DarkSelect name="sEspecialidad" value={filters.sEspecialidad || ''} onChange={handleChange}>
        <option value="">Especialidad</option>
        <option value="Tacos">Tacos</option>
        <option value="Salsas">Salsas</option>
        <option value="Carnes">Carnes</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Postres">Postres</option>
      </DarkSelect>

      {/* Turno */}
      <DarkSelect name="sTurno" value={filters.sTurno || ''} onChange={handleChange}>
        <option value="">Turno</option>
        <option value="mañana">Mañana</option>
        <option value="tarde">Tarde</option>
        <option value="noche">Noche</option>
      </DarkSelect>

      {/* Limpiar */}
      {hasActive && (
        <button onClick={() => onFilterChange({})}
          style={{
            background: `${C.pink}12`, border: `1.5px solid ${C.pink}44`,
            borderRadius: "10px", padding: "8px 14px", color: C.pink,
            fontFamily: FONT, fontWeight: "700", fontSize: "12px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap", transition: "all 0.18s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${C.pink}22`; e.currentTarget.style.borderColor = C.pink; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${C.pink}12`; e.currentTarget.style.borderColor = `${C.pink}44`; }}
        >
          <X size={12} /> Limpiar
        </button>
      )}
    </div>
  );
};

/* ─── FIELD LABEL ────────────────────────────────────────────── */
function FieldLabel({ children }) {
  return (
    <label style={{
      display: "block", color: C.textMuted, fontSize: "11px", fontWeight: "700",
      letterSpacing: "0.9px", textTransform: "uppercase", marginBottom: "6px", fontFamily: FONT,
    }}>
      {children}
    </label>
  );
}

/* ─── DARK INPUT ─────────────────────────────────────────────── */
function DarkInput({ id, name, type = "text", value, onChange, required, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id} name={name} type={type} value={value} onChange={onChange}
      required={required} placeholder={placeholder || ""}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box", background: C.bg,
        border: `1.5px solid ${focused ? C.pink : C.border}`, borderRadius: "10px",
        padding: "10px 14px", color: C.textPrimary, fontFamily: FONT,
        fontWeight: "600", fontSize: "13px", outline: "none",
        transition: "border-color 0.18s, box-shadow 0.18s",
        boxShadow: focused ? glow(C.pink, "18") : "none",
      }}
    />
  );
}

/* ─── DARK TEXTAREA ──────────────────────────────────────────── */
function DarkTextarea({ id, name, value, onChange, placeholder, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id} name={name} value={value} onChange={onChange}
      placeholder={placeholder || ""} rows={rows}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box", background: C.bg,
        border: `1.5px solid ${focused ? C.pink : C.border}`, borderRadius: "10px",
        padding: "10px 14px", color: C.textPrimary, fontFamily: FONT,
        fontWeight: "600", fontSize: "13px", outline: "none",
        transition: "border-color 0.18s, box-shadow 0.18s",
        boxShadow: focused ? glow(C.pink, "18") : "none",
        resize: "vertical"
      }}
    />
  );
}

/* ─── DARK SELECT MODAL ──────────────────────────────────────── */
function DarkSelectModal({ id, name, value, onChange, required, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      id={id} name={name} value={value} onChange={onChange} required={required}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box", background: C.bg,
        border: `1.5px solid ${focused ? C.pink : C.border}`, borderRadius: "10px",
        padding: "10px 36px 10px 14px", color: C.textPrimary,
        fontFamily: FONT, fontWeight: "600", fontSize: "13px",
        outline: "none", cursor: "pointer",
        appearance: "none", WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C5040' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "calc(100% - 12px) center",
        transition: "border-color 0.18s, box-shadow 0.18s",
        boxShadow: focused ? glow(C.pink, "18") : "none",
      }}
    >
      {children}
    </select>
  );
}

/* ─── CONFIRM MODAL ──────────────────────────────────────────── */
export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)", zIndex: 500,
      }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 501,
        width: "90%", maxWidth: "380px",
        background: C.bgCard, border: `1.5px solid ${C.borderBright}`,
        borderRadius: "20px", padding: "24px", textAlign: "center",
        boxShadow: `0 24px 64px rgba(0,0,0,0.55), ${glow(C.pink, "18")}`,
        fontFamily: FONT,
      }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "14px",
          background: `${C.pink}18`, border: `1.5px solid ${C.pink}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <AlertTriangle size={24} color={C.pink} />
        </div>
        
        <h3 style={{ margin: "0 0 8px", color: C.textPrimary, fontSize: "18px", fontWeight: "800" }}>
          {title}
        </h3>
        <p style={{ margin: "0 0 24px", color: C.textSecondary, fontSize: "14px", lineHeight: 1.5 }}>
          {message}
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="secondary" onClick={onClose} fullWidth>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onConfirm} fullWidth>
            Sí, desactivar
          </Button>
        </div>
      </div>
    </>
  );
};

/* ─── COOKS MODAL ────────────────────────────────────────────── */
const DEFAULTS = { 
  sNombre: '', sApellido: '', sEmail: '', 
  sTelefono: '', dtFechaNacimiento: '', sDescripcion: '', 
  sEspecialidad: 'Tacos', sTurno: 'mañana', bActivo: true 
};

export const CooksModal = ({ isOpen, onClose, onSave, cook }) => {
  const [formData, setFormData] = useState(DEFAULTS);

  useEffect(() => {
    if (cook) {
      setFormData({
        ...cook,
        sTelefono: cook.sTelefono || '',
        dtFechaNacimiento: cook.dtFechaNacimiento || '',
        sDescripcion: cook.sDescripcion || ''
      });
    } else {
      setFormData({ ...DEFAULTS });
    }
  }, [cook, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const isEdit = Boolean(cook);

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)", zIndex: 400,
      }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 401,
        width: "100%", maxWidth: "460px",
        maxHeight: "90vh", overflowY: "auto",
        background: C.bgCard, border: `1.5px solid ${C.borderBright}`,
        borderRadius: "20px",
        boxShadow: `0 24px 64px rgba(0,0,0,0.55), ${glow(C.pink, "18")}`,
        fontFamily: FONT,
      }}>
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${C.pink}, ${C.purple})`, borderRadius: "20px 20px 0 0" }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "9px",
              background: `${C.pink}18`, border: `1.5px solid ${C.pink}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChefHat size={17} color={C.pink} />
            </div>
            <div>
              <h2 style={{ margin: 0, color: C.textPrimary, fontWeight: "800", fontSize: "18px" }}>
                {isEdit ? "Editar Cocinero" : "Nuevo Cocinero"}
              </h2>
              <p style={{ margin: 0, color: C.textMuted, fontSize: "12px" }}>
                {isEdit ? `Modificando: ${cook.sNombre} ${cook.sApellido}` : "Completa los datos del nuevo cocinero"}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: C.bgCardHov, border: `1px solid ${C.border}`, borderRadius: "8px",
            padding: "6px", cursor: "pointer", display: "flex", color: C.textMuted, transition: "all 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.pink; e.currentTarget.style.color = C.pink; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} style={{ padding: "20px 24px 24px" }}>

          {/* Nombre + Apellido */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <FieldLabel>Nombre</FieldLabel>
              <DarkInput id="sNombre" name="sNombre" value={formData.sNombre} onChange={handleChange} required placeholder="Juan" />
            </div>
            <div>
              <FieldLabel>Apellido</FieldLabel>
              <DarkInput id="sApellido" name="sApellido" value={formData.sApellido} onChange={handleChange} required placeholder="García" />
            </div>
          </div>

          {/* Email + Teléfono */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <FieldLabel>Email</FieldLabel>
              <DarkInput id="sEmail" name="sEmail" type="email" value={formData.sEmail} onChange={handleChange} required placeholder="cook@itaquito.com" />
            </div>
            <div>
              <FieldLabel>Teléfono</FieldLabel>
              <DarkInput id="sTelefono" name="sTelefono" type="text" value={formData.sTelefono} onChange={handleChange} placeholder="4771234567" />
            </div>
          </div>

          {/* Especialidad + Turno */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <FieldLabel>Especialidad</FieldLabel>
              <DarkSelectModal id="sEspecialidad" name="sEspecialidad" value={formData.sEspecialidad} onChange={handleChange} required>
                <option value="Tacos">Tacos</option>
                <option value="Salsas">Salsas</option>
                <option value="Carnes">Carnes</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Postres">Postres</option>
              </DarkSelectModal>
            </div>
            <div>
              <FieldLabel>Turno</FieldLabel>
              <DarkSelectModal id="sTurno" name="sTurno" value={formData.sTurno} onChange={handleChange} required>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </DarkSelectModal>
            </div>
          </div>

          {/* Fecha Nacimiento */}
          <div style={{ marginBottom: "16px" }}>
            <FieldLabel>Fecha de Nacimiento</FieldLabel>
            <DarkInput id="dtFechaNacimiento" name="dtFechaNacimiento" type="date" value={formData.dtFechaNacimiento} onChange={handleChange} />
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: "16px" }}>
            <FieldLabel>Descripción</FieldLabel>
            <DarkTextarea id="sDescripcion" name="sDescripcion" value={formData.sDescripcion} onChange={handleChange} placeholder="Experto en carnes asadas..." />
          </div>

          {/* bActivo (solo al editar) */}
          {isEdit && (
            <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" id="bActivo" name="bActivo" checked={formData.bActivo} onChange={handleChange}
                style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: C.pink }} />
              <FieldLabel>Activo</FieldLabel>
            </div>
          )}

          <div style={{ height: "1px", background: C.border, marginBottom: "18px" }} />

          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="button" variant="secondary" onClick={onClose} fullWidth>Cancelar</Button>
            <Button type="submit" variant="primary" icon={<Save size={14} />} fullWidth>
              {isEdit ? "Guardar cambios" : "Crear cocinero"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};