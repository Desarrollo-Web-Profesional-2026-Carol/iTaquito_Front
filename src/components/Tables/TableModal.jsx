import { useState, useEffect } from 'react';
import { C, FONT, glow } from '../../styles/designTokens';
import { X, TableProperties, Save } from 'lucide-react';
import Button from '../UI/Button';

/* ─── FIELD LABEL ────────────────────────────────────────────── */
function FieldLabel({ children }) {
  return (
    <label style={{
      display: "block",
      color: C.textMuted,
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "0.9px",
      textTransform: "uppercase",
      marginBottom: "6px",
      fontFamily: FONT,
    }}>
      {children}
    </label>
  );
}

/* ─── DARK INPUT ─────────────────────────────────────────────── */
function DarkInput({ id, name, type = "text", value, onChange, required, min, max, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id} name={name} type={type}
      value={value} onChange={onChange}
      required={required} min={min} max={max}
      placeholder={placeholder || ""}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        background: C.bg,
        border: `1.5px solid ${focused ? C.pink : C.border}`,
        borderRadius: "10px",
        padding: "10px 14px",
        color: C.textPrimary,
        fontFamily: FONT, fontWeight: "600", fontSize: "13px",
        outline: "none",
        transition: "border-color 0.18s, box-shadow 0.18s",
        boxShadow: focused ? glow(C.pink, "18") : "none",
      }}
    />
  );
}

/* ─── DARK SELECT ────────────────────────────────────────────── */
function DarkSelect({ id, name, value, onChange, required, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      id={id} name={name} value={value}
      onChange={onChange} required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        background: C.bg,
        border: `1.5px solid ${focused ? C.pink : C.border}`,
        borderRadius: "10px",
        padding: "10px 36px 10px 14px",
        color: C.textPrimary,
        fontFamily: FONT, fontWeight: "600", fontSize: "13px",
        outline: "none", cursor: "pointer",
        appearance: "none", WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C5040' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(100% - 12px) center",
        transition: "border-color 0.18s, box-shadow 0.18s",
        boxShadow: focused ? glow(C.pink, "18") : "none",
      }}
    >
      {children}
    </select>
  );
}

/* ─── DARK TEXTAREA ──────────────────────────────────────────── */
function DarkTextarea({ id, name, value, onChange, rows = 3, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id} name={name} value={value}
      onChange={onChange} rows={rows}
      placeholder={placeholder || ""}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%", boxSizing: "border-box",
        background: C.bg,
        border: `1.5px solid ${focused ? C.pink : C.border}`,
        borderRadius: "10px",
        padding: "10px 14px",
        color: C.textPrimary,
        fontFamily: FONT, fontWeight: "600", fontSize: "13px",
        outline: "none", resize: "vertical",
        transition: "border-color 0.18s, box-shadow 0.18s",
        boxShadow: focused ? glow(C.pink, "18") : "none",
      }}
    />
  );
}

/* ─── MODAL ──────────────────────────────────────────────────── */
const DEFAULTS = {
  sNombre: '', iCapacidad: 4,
  sUbicacion: 'interior', sEstado: 'disponible', sDescripcion: '',
};

const TableModal = ({ isOpen, onClose, onSave, table }) => {
  const [formData, setFormData] = useState(DEFAULTS);

  useEffect(() => {
    setFormData(table ? { ...table } : { ...DEFAULTS });
  }, [table, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isEdit = Boolean(table);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 400,
        }}
      />

      {/* ── Panel ── */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 401,
        width: "100%", maxWidth: "460px",
        maxHeight: "90vh", overflowY: "auto",
        background: C.bgCard,
        border: `1.5px solid ${C.borderBright}`,
        borderRadius: "20px",
        boxShadow: `0 24px 64px rgba(0,0,0,0.55), ${glow(C.pink, "18")}`,
        fontFamily: FONT,
      }}>

        {/* Franja top */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${C.pink}, ${C.purple})`, borderRadius: "20px 20px 0 0" }} />

        {/* Header del modal */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 24px 0",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "9px",
              background: `${C.pink}18`, border: `1.5px solid ${C.pink}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <TableProperties size={17} color={C.pink} />
            </div>
            <div>
              <h2 style={{ margin: 0, color: C.textPrimary, fontWeight: "800", fontSize: "18px" }}>
                {isEdit ? "Editar Mesa" : "Nueva Mesa"}
              </h2>
              <p style={{ margin: 0, color: C.textMuted, fontSize: "12px" }}>
                {isEdit ? `Modificando: ${table.sNombre}` : "Completa los datos de la nueva mesa"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: C.bgCardHov, border: `1px solid ${C.border}`,
              borderRadius: "8px", padding: "6px",
              cursor: "pointer", display: "flex", color: C.textMuted,
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.pink; e.currentTarget.style.color = C.pink; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: "20px 24px 24px" }}>

          {/* Nombre */}
          <div style={{ marginBottom: "16px" }}>
            <FieldLabel>Nombre de la mesa</FieldLabel>
            <DarkInput
              id="sNombre" name="sNombre"
              value={formData.sNombre}
              onChange={handleChange}
              required placeholder="Ej: Mesa 1, Terraza A..."
            />
          </div>

          {/* Capacidad + Ubicación */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div>
              <FieldLabel>Capacidad</FieldLabel>
              <DarkInput
                id="iCapacidad" name="iCapacidad" type="number"
                value={formData.iCapacidad}
                onChange={handleChange}
                required min="1" max="20"
              />
            </div>
            <div>
              <FieldLabel>Ubicación</FieldLabel>
              <DarkSelect
                id="sUbicacion" name="sUbicacion"
                value={formData.sUbicacion}
                onChange={handleChange} required
              >
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
                <option value="terraza">Terraza</option>
                <option value="vip">VIP</option>
              </DarkSelect>
            </div>
          </div>

          {/* Estado */}
          <div style={{ marginBottom: "16px" }}>
            <FieldLabel>Estado</FieldLabel>
            <DarkSelect
              id="sEstado" name="sEstado"
              value={formData.sEstado}
              onChange={handleChange} required
            >
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
              <option value="reservada">Reservada</option>
              <option value="inactiva">Inactiva</option>
            </DarkSelect>
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: "24px" }}>
            <FieldLabel>Descripción (opcional)</FieldLabel>
            <DarkTextarea
              id="sDescripcion" name="sDescripcion"
              value={formData.sDescripcion}
              onChange={handleChange}
              rows={3}
              placeholder="Notas sobre la mesa, características especiales..."
            />
          </div>

          {/* Divisor */}
          <div style={{ height: "1px", background: C.border, marginBottom: "18px" }} />

          {/* Acciones */}
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="button" variant="secondary" onClick={onClose} fullWidth>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" icon={<Save size={14} />} fullWidth>
              {isEdit ? "Guardar cambios" : "Crear mesa"}
            </Button>
          </div>

        </form>
      </div>
    </>
  );
};

export default TableModal;