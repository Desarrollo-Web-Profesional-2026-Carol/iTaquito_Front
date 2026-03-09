import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, createProduct, updateProduct } from '../../services/productsService';
import { getCategories } from '../../services/categoriesService';

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

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadProduct();
    }
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
    <div>
      <h2>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      <button onClick={() => navigate('/admin/productos')}>{'< Volver'}</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <div>
          <label>Nombre:</label><br />
          <input type="text" name="sNombre" value={formData.sNombre} onChange={handleChange} required />
        </div>

        <div>
          <label>Descripción:</label><br />
          <textarea name="sDescripcion" value={formData.sDescripcion} onChange={handleChange} rows="3" />
        </div>

        <div>
          <label>Precio:</label><br />
          <input type="number" step="0.01" name="dPrecio" value={formData.dPrecio} onChange={handleChange} required />
        </div>

        <div>
          <label>Categoría:</label><br />
          <select name="iCategoriaId" value={formData.iCategoriaId} onChange={handleChange} required>
            <option value="">Seleccione una categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.sNombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label>
            <input type="checkbox" name="bDisponible" checked={formData.bDisponible} onChange={handleChange} />
            {' '}Disponible
          </label>
        </div>

        <div>
          <label>Imagen (Opcional):</label><br />
          {currentImageUrl && !imageFile && (
            <div style={{ marginBottom: '10px' }}>
              <img src={currentImageUrl} alt="Actual" width="100" />
            </div>
          )}
          <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
}
