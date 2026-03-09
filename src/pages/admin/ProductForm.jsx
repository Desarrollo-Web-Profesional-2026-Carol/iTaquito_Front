import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, createProduct, updateProduct } from '../../services/productsService';
import { getCategories } from '../../services/categoriesService';
import { C, FONT, PICADO, glow } from '../../styles/designTokens';
import { ChevronLeft, PackagePlus, Edit3, Image as ImageIcon, CheckCircle, AlertCircle, Type, AlignLeft, DollarSign, Tag, UploadCloud } from 'lucide-react';

/* ─── PAPEL PICADO ───────────────────────────────────────────── */
function PapelPicado() {
  return (
    <div style={{ width: "100%", lineHeight: 0 }}>
      <div style={{ display: "flex", width: "100%" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 0,
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderTop: `32px solid ${PICADO[i % PICADO.length]}`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── INPUT COMPONENT ────────────────────────────────────────── */
function InputField({ id, type, name, label, value, onChange, Icon, required = false, isTextArea = false }) {
  const [focused, setFocused] = useState(false);
  const filled = value?.toString().length > 0;

  const baseStyle = {
    width: "100%",
    background: C.bg,
    border: `1.5px solid ${focused ? C.pink : C.border}`,
    borderRadius: "10px",
    padding: isTextArea ? "24px 16px 12px 42px" : "18px 16px 8px 42px",
    color: C.textPrimary,
    fontFamily: FONT,
    fontSize: "14px",
    fontWeight: "500",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused ? glow(C.pink, "22") : "none",
    boxSizing: "border-box",
    resize: isTextArea ? "vertical" : "none",
    minHeight: isTextArea ? "100px" : "auto",
  };

  return (
    <div style={{ position: "relative", marginBottom: "16px" }}>
      <div style={{
        position: "absolute", left: "14px", top: isTextArea ? "24px" : "50%", transform: isTextArea ? "none" : "translateY(-50%)",
        color: focused ? C.pink : C.textMuted, transition: "color 0.2s", zIndex: 1,
      }}>
        <Icon size={16} />
      </div>

      {isTextArea ? (
        <textarea id={id} name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} style={baseStyle} />
      ) : (
        <input 
          id={id} name={name} type={type} value={value} onChange={onChange} 
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} style={baseStyle} 
          step={type === "number" ? "0.01" : undefined}
          onKeyDown={(e) => {
            if (type === 'number' && ['e', 'E', '+', '-'].includes(e.key)) {
              e.preventDefault();
            }
          }}
        />
      )}

      <label htmlFor={id} style={{
        position: "absolute",
        left: "42px",
        top: focused || filled ? "8px" : (isTextArea ? "24px" : "50%"),
        transform: focused || filled ? "translateY(0)" : "translateY(-50%)",
        fontSize: focused || filled ? "10px" : "14px",
        color: focused ? C.pink : C.textMuted,
        fontFamily: FONT,
        fontWeight: "600",
        letterSpacing: focused || filled ? "0.8px" : "0",
        textTransform: focused || filled ? "uppercase" : "none",
        transition: "all 0.2s ease",
        pointerEvents: "none",
      }}>
        {label}
      </label>
    </div>
  );
}

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    sNombre: '',
    sDescripcion: '',
    dPrecio: '',
    iCategoriaId: '',
    bDisponible: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // Estados visuales adicionales
  const [selectFocused, setSelectFocused] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  };

  const loadProduct = async () => {
    try {
      const res = await getProductById(id);
      const p = res.data;
      setFormData({
        sNombre: p.sNombre,
        sDescripcion: p.sDescripcion || '',
        dPrecio: p.dPrecio,
        iCategoriaId: p.iCategoriaId,
        bDisponible: p.bDisponible,
      });
      setCurrentImageUrl(p.sImagenUrl);
    } catch (err) {
      console.error('Error cargando producto:', err);
      setError('No se pudo cargar el producto');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('sNombre', formData.sNombre);
      data.append('sDescripcion', formData.sDescripcion);
      data.append('dPrecio', formData.dPrecio);
      data.append('iCategoriaId', formData.iCategoriaId);
      data.append('bDisponible', formData.bDisponible);
      if (imageFile) {
        data.append('imagen', imageFile);
      }

      if (isEditing) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }
      navigate('/admin/productos');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: FONT,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ocultar botones incrementadores nativos del navegador */}
      <style>{`
        /* Darle estilo a las flechas del input number para que sean visibles y combinen */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 1;
          height: 30px;
          cursor: pointer;
        }
        select option {
          background-color: ${C.bgCard};
          color: ${C.textPrimary};
        }
      `}</style>

      {/* Orbes de fondo */}
      <div style={{ position: "fixed", top: "-100px", left: "-100px",  width: "400px", height: "400px", borderRadius: "50%", background: `${C.pink}08`,   filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: `${C.teal}08`,  filter: "blur(80px)", pointerEvents: "none" }} />

      <button onClick={() => navigate('/admin/productos')} style={{
        alignSelf: "flex-start",
        background: "transparent",
        color: C.textSecondary,
        border: "none",
        fontFamily: FONT,
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "20px",
        transition: "color 0.2s"
      }}
      onMouseEnter={e => e.currentTarget.style.color = C.pink}
      onMouseLeave={e => e.currentTarget.style.color = C.textSecondary}>
        <ChevronLeft size={18} /> Volver al menú
      </button>

      {/* ── CARD MAIN ── */}
      <div style={{
        width: "100%",
        maxWidth: "560px",
        background: C.bgCard,
        border: `1.5px solid ${C.border}`,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${C.borderBright}`,
        position: "relative",
        zIndex: 1
      }}>
        <PapelPicado />

        <div style={{ padding: "32px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              background: `${C.pink}22`,
              border: `1.5px solid ${C.pink}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: glow(C.pink),
            }}>
              {isEditing ? <Edit3 size={26} color={C.pink} /> : <PackagePlus size={26} color={C.pink} />}
            </div>
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: "800", color: C.pink, letterSpacing: "-0.5px" }}>
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <p style={{ margin: 0, color: C.textSecondary, fontSize: "14px", fontWeight: "500" }}>
                Comprueba que los datos sean correctos.
              </p>
            </div>
          </div>

          {error && (
            <div style={{
              background: `${C.pink}12`, border: `1px solid ${C.pink}44`, borderRadius: "10px", padding: "12px 16px",
              marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px", color: C.pink, fontSize: "14px", fontWeight: "600"
            }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <InputField id="sNombre" name="sNombre" type="text" label="Nombre del Producto" value={formData.sNombre} onChange={handleChange} Icon={Type} required />
            <InputField id="sDescripcion" name="sDescripcion" label="Descripción (ingredientes, detalles...)" value={formData.sDescripcion} onChange={handleChange} Icon={AlignLeft} isTextArea />
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <InputField id="dPrecio" name="dPrecio" type="number" label="Precio ($)" value={formData.dPrecio} onChange={handleChange} Icon={DollarSign} required />
              
              {/* Select Categoría */}
              <div style={{ position: "relative", marginBottom: "16px" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: selectFocused ? C.pink : C.textMuted, transition: "color 0.2s", zIndex: 1 }}>
                  <Tag size={16} />
                </div>
                <select name="iCategoriaId" value={formData.iCategoriaId} onChange={handleChange} onFocus={() => setSelectFocused(true)} onBlur={() => setSelectFocused(false)} required
                  style={{
                    width: "100%", background: C.bg, border: `1.5px solid ${selectFocused ? C.pink : C.border}`, borderRadius: "10px",
                    padding: "18px 16px 8px 42px", color: formData.iCategoriaId ? C.textPrimary : C.textMuted, fontFamily: FONT, fontSize: "14px", fontWeight: "500",
                    outline: "none", transition: "all 0.2s", boxShadow: selectFocused ? glow(C.pink, "22") : "none", appearance: "none", cursor: "pointer"
                  }}
                >
                  <option value="" disabled>Seleccione Categoría</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} style={{ background: C.bgCard }}>{c.sNombre}</option>
                  ))}
                </select>
                <label style={{
                  position: "absolute", left: "42px", top: "8px", fontSize: "10px", color: selectFocused ? C.pink : C.textMuted,
                  fontFamily: FONT, fontWeight: "600", letterSpacing: "0.8px", textTransform: "uppercase", pointerEvents: "none", transition: "color 0.2s"
                }}>Categoría</label>
              </div>
            </div>

            {/* Toggle Disponible */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: `${C.bg}88`, borderRadius: "10px", border: `1px solid ${C.border}`, marginBottom: "24px" }}>
              <label style={{
                position: "relative", display: "inline-block", width: "44px", height: "24px", cursor: "pointer"
              }}>
                <input type="checkbox" name="bDisponible" checked={formData.bDisponible} onChange={handleChange} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: formData.bDisponible ? C.success : C.textMuted,
                  transition: ".4s", borderRadius: "24px",
                  boxShadow: formData.bDisponible ? glow(C.success, "44") : "none"
                }}>
                  <span style={{
                    position: "absolute", height: "18px", width: "18px", left: "3px", bottom: "3px",
                    backgroundColor: "white", transition: ".4s", borderRadius: "50%",
                    transform: formData.bDisponible ? "translateX(20px)" : "translateX(0)"
                  }} />
                </span>
              </label>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: C.textPrimary, fontWeight: "700", fontSize: "14px" }}>Estado del producto</span>
                <span style={{ color: C.textSecondary, fontSize: "12px" }}>
                  {formData.bDisponible ? 'Visible y disponible para ordenar' : 'Oculto (Agotado temporalmente)'}
                </span>
              </div>
            </div>

            {/* Image Dropzone */}
            <div style={{ marginBottom: "32px" }}>
              <span style={{ display: "block", color: C.textSecondary, fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Fotografía del plato</span>
              <div 
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragActive ? C.pink : (imageFile ? C.success : C.borderBright)}`,
                  borderRadius: "16px", padding: "32px", textAlign: "center",
                  background: dragActive ? `${C.pink}11` : C.bg,
                  transition: "all 0.2s", position: "relative", cursor: "pointer"
                }}
              >
                <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
                
                {imageFile ? (
                  <div style={{ color: C.success }}>
                    <CheckCircle size={32} style={{ margin: "0 auto 12px" }} />
                    <p style={{ margin: 0, fontWeight: "700", fontSize: "14px" }}>Imagen seleccionada:</p>
                    <p style={{ margin: "4px 0 0", fontSize: "12px", color: C.textMuted }}>{imageFile.name}</p>
                  </div>
                ) : currentImageUrl ? (
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img src={currentImageUrl} alt="Actual" style={{ height: "100px", borderRadius: "8px", border: `1px solid ${C.border}`, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }} />
                    <div style={{ background: "rgba(0,0,0,0.6)", position: "absolute", bottom: 0, left: 0, right: 0, padding: "4px", fontSize: "10px", color: "#fff", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>Actual</div>
                  </div>
                ) : (
                  <div style={{ color: C.textMuted }}>
                    <UploadCloud size={32} style={{ margin: "0 auto 12px", color: dragActive ? C.pink : C.textMuted }} />
                    <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: dragActive ? C.pink : C.textPrimary }}>Haz clic o arrastra una imagen aquí</p>
                    <p style={{ margin: "4px 0 0", fontSize: "12px" }}>JPG, PNG o WebP (Max 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="button" onClick={() => navigate('/admin/productos')} style={{
                flex: 1, background: "transparent", color: C.textPrimary, border: `1.5px solid ${C.borderBright}`, borderRadius: "10px",
                padding: "14px", fontFamily: FONT, fontWeight: "700", fontSize: "15px", cursor: "pointer", transition: "background 0.2s"
              }} onMouseEnter={e => e.currentTarget.style.background = C.bgAccent} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Cancelar
              </button>
              
              <button type="submit" disabled={loading} style={{
                flex: 2, background: loading ? C.bgAccent : C.pink, color: "#fff", border: "none", borderRadius: "10px",
                padding: "14px", fontFamily: FONT, fontWeight: "800", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : glow(C.pink), transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
              }} onMouseEnter={e => { if(!loading) e.currentTarget.style.boxShadow = glow(C.pink, "88") }} onMouseLeave={e => { if(!loading) e.currentTarget.style.boxShadow = glow(C.pink) }}>
                {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Guardar Producto')}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
