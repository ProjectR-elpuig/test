import { useEffect, useState } from 'react'

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
}

const App = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/productos')
        const data = await res.json()
        setProductos(data)
      } catch (err) {
        console.error('Error al cargar productos', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: '#fff',
      height: '100vh',
      overflowY: 'auto'
    }}>
      <h1>Listado de Productos</h1>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{ width: '100%', maxWidth: '600px' }}>
          {productos.map((producto) => (
            <div
              key={producto.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <h2>{producto.nombre}</h2>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
              <p><strong>Precio:</strong> ${producto.precio.toFixed(2)}</p>
              <p><strong>Stock disponible:</strong> {producto.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
