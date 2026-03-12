import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { cooksService } from '../services/cooks';
import { CooksCard, ConfirmModal } from '../components/Cooks/Cooks';
import { CooksFilters } from '../components/Cooks/Cooks';
import { CooksModal } from '../components/Cooks/Cooks';
import { C, FONT, glow } from '../styles/designTokens';
import {
  ChefHat, Plus, RefreshCw,
  CheckCircle, XCircle, SlidersHorizontal
} from 'lucide-react';

/* ─── MINI STAT ──────────────────────────────────────────────── */
function MiniStat({ label, value, color, Icon }) {
  return (
    <div style={{
      background: C.bgCard, border: `1.5px solid ${C.border}`,
      borderTop: `3px solid ${color}`, borderRadius: "12px",
      padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", flex: "1 1 140px",
    }}>
      <div style={{
        width: "36px", height: "36px", borderRadius: "9px",
        background: `${color}18`, border: `1px solid ${color}33`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={17} color={color} />
      </div>
      <div>
        <div style={{ color, fontWeight: "800", fontSize: "22px", lineHeight: 1 }}>{value}</div>
        <div style={{ color: C.textMuted, fontSize: "11px", marginTop: "2px", fontWeight: "600" }}>{label}</div>
      </div>
    </div>
  );
}

/* ─── EMPTY STATE ────────────────────────────────────────────── */
function EmptyState({ isAdmin, onCreate }) {
  return (
    <div style={{
      textAlign: "center", padding: "72px 24px",
      background: C.bgCard, borderRadius: "20px", border: `1.5px solid ${C.border}`,
    }}>
      <div style={{
        width: "72px", height: "72px", borderRadius: "18px",
        background: `${C.pink}15`, border: `1.5px solid ${C.pink}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 20px", boxShadow: glow(C.pink, "22"),
      }}>
        <ChefHat size={32} color={C.pink} />
      </div>
      <h3 style={{ color: C.textPrimary, margin: "0 0 8px", fontFamily: FONT, fontWeight: "800", fontSize: "18px" }}>
        No hay cocineros registrados
      </h3>
      <p style={{ color: C.textSecondary, fontSize: "14px", margin: "0 0 24px" }}>
        {isAdmin ? "Comienza registrando tu primer cocinero" : "Vuelve más tarde"}
      </p>
      {isAdmin && (
        <button onClick={onCreate} style={{
          background: C.pink, color: "#fff", border: "none",
          borderRadius: "10px", padding: "12px 24px",
          fontFamily: FONT, fontWeight: "700", fontSize: "14px",
          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px",
          boxShadow: glow(C.pink),
        }}>
          <Plus size={16} /> Registrar primer cocinero
        </button>
      )}
    </div>
  );
}

/* ─── COOKS PAGE ─────────────────────────────────────────────── */
const Cooks = () => {
  const [cooks,         setCooks]         = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);
  const [filters,       setFilters]       = useState({});
  const [modalOpen,     setModalOpen]     = useState(false);
  const [selectedCook,  setSelectedCook]  = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const { isAdmin } = useAuth();

  const loadCooks = async () => {
    try {
      setLoading(true);
      const data = await cooksService.getAll(filters);
      setCooks(data.data || data || []);
    } catch (error) {
      console.error('Error al cargar cocineros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCooks(); }, [filters]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCooks();
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleCreate = () => { setSelectedCook(null); setModalOpen(true); };
  
  // Aquí es donde probablemente saltó el error "c is not defined"
  const handleEdit   = (c)  => { setSelectedCook(c);  setModalOpen(true); };

  const handleDeleteClick = (id) => {
    setDeleteModalId(id);
  };

  // Acción definitiva para Desactivar (Usa .delete)
  const confirmDelete = async () => {
    if (!deleteModalId) return;
    try {
      await cooksService.delete(deleteModalId); 
      await loadCooks();
      setDeleteModalId(null); 
    } catch (e) {
      alert(`Error: ${e.response?.data?.message || e.message}`);
    }
  };

  // Acción para Reactivar (Usa .reactivate)
  const handleStatusChange = async (id, bActivo) => {
    try {
      if (bActivo) {
        await cooksService.reactivate(id);
      }
      await loadCooks();
    } catch (e) { 
      console.error(e); 
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedCook) {
        await cooksService.update(selectedCook.id, data);
      } else {
        await cooksService.create(data);
      }
      setModalOpen(false);
      await loadCooks();
    } catch (e) { console.error(e); }
  };

  const total    = cooks.length;
  const activos  = cooks.filter(c => c.bActivo).length;
  const inactivos= cooks.filter(c => !c.bActivo).length;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT, color: C.textPrimary }}>
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <ChefHat size={17} color={C.pink} />
              <span style={{ color: C.textMuted, fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Gestión
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(22px,4vw,28px)", fontWeight: "800", color: C.textPrimary, lineHeight: 1.1 }}>
              Cocineros
            </h1>
            <p style={{ margin: "4px 0 0", color: C.textMuted, fontSize: "13px" }}>
              {total} cocinero{total !== 1 ? "s" : ""} registrado{total !== 1 ? "s" : ""}
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={handleRefresh} style={{
              background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "10px",
              padding: "8px 14px", color: C.textSecondary, fontFamily: FONT,
              fontWeight: "600", fontSize: "13px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.pink; e.currentTarget.style.color = C.pink; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}
            >
              <RefreshCw size={14} style={{ animation: refreshing ? "spin 0.7s linear infinite" : "none" }} />
              Actualizar
            </button>

            {isAdmin && (
              <button onClick={handleCreate} style={{
                background: C.pink, color: "#fff", border: "none",
                borderRadius: "10px", padding: "8px 18px",
                fontFamily: FONT, fontWeight: "700", fontSize: "13px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                boxShadow: glow(C.pink), transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = glow(C.pink, "88")}
                onMouseLeave={e => e.currentTarget.style.boxShadow = glow(C.pink)}
              >
                <Plus size={15} /> Nuevo Cocinero
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
          <MiniStat label="Total"     value={total}    color={C.pink}   Icon={ChefHat}     />
          <MiniStat label="Activos"   value={activos}  color={C.teal}   Icon={CheckCircle} />
          <MiniStat label="Inactivos" value={inactivos} color={C.textMuted} Icon={XCircle} />
        </div>

        {/* Filtros */}
        <div style={{
          background: C.bgCard, border: `1px solid ${C.border}`,
          borderRadius: "14px", padding: "16px 20px", marginBottom: "24px",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <SlidersHorizontal size={15} color={C.textMuted} style={{ flexShrink: 0 }} />
          <CooksFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Contenido */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{
              display: "inline-block", width: "44px", height: "44px",
              border: `3px solid ${C.border}`, borderTopColor: C.pink,
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ marginTop: "16px", color: C.textMuted, fontSize: "14px" }}>Cargando cocineros...</p>
          </div>
        ) : cooks.length === 0 ? (
          <EmptyState isAdmin={isAdmin} onCreate={handleCreate} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
            {cooks.map(cook => (
              <CooksCard key={cook.id} cook={cook} onEdit={handleEdit} onDelete={handleDeleteClick} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}

      </main>

      <CooksModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} cook={selectedCook} />
      
      <ConfirmModal 
        isOpen={deleteModalId !== null} 
        onClose={() => setDeleteModalId(null)} 
        onConfirm={confirmDelete}
        title="¿Desactivar cocinero?"
        message="El cocinero ya no tendrá acceso al sistema, pero su historial se mantendrá intacto. Podrás reactivarlo más tarde."
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Cooks;