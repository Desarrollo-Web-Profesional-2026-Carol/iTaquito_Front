import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productsService';
import { getCategories } from '../../services/categoriesService';
import { C, FONT, PICADO } from '../../styles/designTokens';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, PackageOpen, Filter, X } from 'lucide-react';

/* ─── PAPEL PICADO BANNER ───────────────────────────────────── */
function PapelPicado() {
  return (
    <div style={{ width: "100%", lineHeight: 0, overflow: "hidden" }}>
      <div style={{ display: "flex", width: "100%" }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 0, minWidth: "40px",
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: `24px solid ${PICADO[i % PICADO.length]}`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' o category ID
  const [minPrecio, setMinPrecio] = useState('');
  const [maxPrecio, setMaxPrecio] = useState('');
  const [bDisponible, setBDisponible] = useState('todos'); // 'todos', 'true', 'false'

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Load categories once if empty
      if (categories.length === 0) {
        const catsRes = await getCategories();
        setCategories(catsRes.data);
      }

      // Prepare filters
      const filters = {};
      if (search) filters.sNombre = search;
      if (activeTab !== 'all') filters.iCategoriaId = activeTab;
      if (minPrecio) filters.minPrecio = minPrecio;
      if (maxPrecio) filters.maxPrecio = maxPrecio;
      if (bDisponible !== 'todos') filters.bDisponible = bDisponible;

      const prodsRes = await getProducts(filters);
      setProducts(prodsRes.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  }, [search, activeTab, minPrecio, maxPrecio, bDisponible, categories.length]);

  useEffect(() => {
    // Usamos debounce simple para no saturar al tipear
    const timer = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadData]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      try {
        await deleteProduct(id);
        loadData();
      } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const clearFilters = () => {
    setSearch('');
    setMinPrecio('');
    setMaxPrecio('');
    setBDisponible('todos');
    setActiveTab('all');
  };

  const inputStyle = {
    background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: "10px", padding: "10px 14px",
    color: C.textPrimary, fontFamily: FONT, fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box"
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT, color: C.textPrimary, paddingBottom: "60px" }}>
      {/* Header Admin */}
      <div style={{ background: C.bgAccent, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
        <PapelPicado />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "28px", color: C.pink, fontWeight: "800", letterSpacing: "-0.5px" }}>Gestión de Menú</h1>
            <p style={{ margin: "4px 0 0", color: C.textSecondary, fontSize: "14px", fontWeight: "500" }}>Administra productos, precios y disponibilidad.</p>
          </div>
          
          <Link to="/admin/productos/nuevo" style={{ textDecoration: "none" }}>
            <button style={{ background: C.pink, color: "#fff", border: "none", borderRadius: "12px", padding: "12px 20px", fontFamily: FONT, fontWeight: "700", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <Plus size={18} /> Nuevo Producto
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 24px" }}>
        
        {/* ─── FILTROS Y CATEGORÍAS ─── */}
        <div style={{
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          {/* Header de Filtros */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: C.textPrimary, fontWeight: "700", fontSize: "16px" }}>
              <Filter size={18} color={C.pink} />
              Filtrar Catálogo
            </div>
            {(search || activeTab !== 'all' || minPrecio || maxPrecio || bDisponible !== 'todos') && (
              <button onClick={clearFilters} style={{ background: "transparent", color: C.textMuted, border: "none", fontFamily: FONT, fontWeight: "600", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = C.pink} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
                <X size={14} /> Limpiar filtros
              </button>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {/* Buscador general */}
            <div style={{ flex: "1 1 300px", minWidth: "250px" }}>
              <label style={{ display: "block", fontSize: "13px", color: C.textSecondary, marginBottom: "8px", fontWeight: "600" }}>Buscar por nombre</label>
              <div style={{ position: "relative" }}>
                <Search size={16} color={C.textMuted} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input type="text" placeholder="¿Qué buscas?" value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: "40px" }} />
              </div>
            </div>

            {/* Categorías integradas en la barra */}
            <div style={{ flex: "2 1 400px" }}>
              <label style={{ display: "block", fontSize: "13px", color: C.textSecondary, marginBottom: "8px", fontWeight: "600" }}>Categoría</label>
              <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
                <button onClick={() => setActiveTab('all')} style={{ whiteSpace: 'nowrap', background: activeTab === 'all' ? `${C.pink}11` : "transparent", color: activeTab === 'all' ? C.pink : C.textSecondary, border: `1px solid ${activeTab === 'all' ? C.pink : C.borderBright}`, borderRadius: "8px", padding: "8px 16px", fontFamily: FONT, fontWeight: "600", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                  Todas
                </button>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{ whiteSpace: 'nowrap', background: activeTab === cat.id ? `${C.teal}11` : "transparent", color: activeTab === cat.id ? C.teal : C.textSecondary, border: `1px solid ${activeTab === cat.id ? C.teal : C.borderBright}`, borderRadius: "8px", padding: "8px 16px", fontFamily: FONT, fontWeight: "600", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                    {cat.sNombre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filtros Secundarios */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ flex: "1 1 120px" }}>
              <label style={{ display: "block", fontSize: "13px", color: C.textSecondary, marginBottom: "8px", fontWeight: "600" }}>Precio Mínimo</label>
              <input type="number" placeholder="$ Mínimo" value={minPrecio} onChange={(e) => setMinPrecio(e.target.value)} style={inputStyle} min="0" />
            </div>

            <div style={{ flex: "1 1 120px" }}>
              <label style={{ display: "block", fontSize: "13px", color: C.textSecondary, marginBottom: "8px", fontWeight: "600" }}>Precio Máximo</label>
              <input type="number" placeholder="$ Máximo" value={maxPrecio} onChange={(e) => setMaxPrecio(e.target.value)} style={inputStyle} min="0" />
            </div>

            <div style={{ flex: "1 1 160px" }}>
              <label style={{ display: "block", fontSize: "13px", color: C.textSecondary, marginBottom: "8px", fontWeight: "600" }}>Mostrar Menú</label>
              <select value={bDisponible} onChange={(e) => setBDisponible(e.target.value)} style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}>
                <option value="todos">Disponibles y Agotados</option>
                <option value="true">Solo Disponibles</option>
                <option value="false">Solo Agotados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: C.textMuted }}>
            <PackageOpen size={48} style={{ opacity: 0.5, marginBottom: "16px" }} />
            <p>Filtrando menú...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: C.bgCard, borderRadius: "16px", border: `1px dashed ${C.borderBright}` }}>
            <p style={{ color: C.textSecondary, fontSize: "16px", margin: 0 }}>No se encontraron productos con estos criterios.</p>
            <button onClick={clearFilters} style={{ background: "transparent", color: C.pink, border: "none", cursor: "pointer", fontFamily: FONT, marginTop: "12px", fontWeight: "700" }}>Ver todos los productos</button>
          </div>
        ) : (
          /* Grid de Productos */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {products.map((p, i) => (
              <div key={p.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = PICADO[i % PICADO.length]; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; }}>
                
                {/* Imagen del producto */}
                <div style={{ height: "160px", background: C.bgAccent, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${C.border}` }}>
                  {p.sImagenUrl ? (
                    <img src={p.sImagenUrl} alt={p.sNombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ImageIcon size={40} color={C.textMuted} opacity={0.3} />
                  )}
                  {/* Badge Categoría */}
                  <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", border: `1px solid ${PICADO[i % PICADO.length]}`, color: "#fff", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                    {p.categoria?.sNombre || 'Sin Categoría'}
                  </div>
                </div>

                {/* Contenido */}
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: C.cream, lineHeight: 1.2 }}>{p.sNombre}</h3>
                    <span style={{ fontSize: "18px", fontWeight: "800", color: C.teal }}>${p.dPrecio}</span>
                  </div>
                  
                  <p style={{ margin: "0 0 16px", fontSize: "13px", color: C.textSecondary, lineHeight: 1.5, flex: 1 }}>
                    {p.sDescripcion || 'Sin descripción'}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.bDisponible ? C.teal : C.textMuted }} />
                    <span style={{ fontSize: "12px", fontWeight: "600", color: p.bDisponible ? C.teal : C.textMuted }}>
                      {p.bDisponible ? 'Disponible' : 'Agotado'}
                    </span>
                  </div>

                  {/* Acciones */}
                  <div style={{ display: "flex", gap: "8px", borderTop: `1px solid ${C.border}`, paddingTop: "16px" }}>
                    <Link to={`/admin/productos/editar/${p.id}`} style={{ flex: 1, textDecoration: "none" }}>
                      <button style={{ width: "100%", background: "rgba(59, 130, 246, 0.1)", color: "#3B82F6", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: "8px", padding: "8px", fontFamily: FONT, fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"}>
                        <Edit2 size={14} /> Editar
                      </button>
                    </Link>

                    <button style={{ flex: 1, background: "rgba(239, 68, 68, 0.1)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px", padding: "8px", fontFamily: FONT, fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "all 0.2s" }}
                    onClick={() => handleDelete(p.id, p.sNombre)}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}>
                      <Trash2 size={14} /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
