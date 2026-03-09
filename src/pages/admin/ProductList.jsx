import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productsService';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        loadProducts(); // Recargar lista
      } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('Error al eliminar');
      }
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div>
      <h2>Módulo de Productos (Admin)</h2>
      <Link to="/admin/productos/nuevo">
        <button>+ Crear Nuevo Producto</button>
      </Link>

      <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {p.sImagenUrl ? (
                  <img src={p.sImagenUrl} alt={p.sNombre} width="50" height="50" style={{ objectFit: 'cover' }} />
                ) : 'Sin imagen'}
              </td>
              <td>{p.sNombre}</td>
              <td>{p.categoria?.sNombre}</td>
              <td>${p.dPrecio}</td>
              <td>{p.bDisponible ? 'Disponible' : 'Agotado'}</td>
              <td>
                <Link to={`/admin/productos/editar/${p.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(p.id)} style={{ color: 'red', marginLeft: '10px' }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No hay productos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
