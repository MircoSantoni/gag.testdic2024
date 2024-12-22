import React, { useState, useEffect } from 'react';
import { clientApi } from '../api/Client';
import { ChevronLeft, ChevronRight, Trash2, Edit, Save } from 'lucide-react';

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const itemsPerPage = 5;

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await clientApi.getAll();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        await clientApi.delete(id);
        loadClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleEdit = async (client) => {
    setSelectedId(client.id);
    setFormData({
      nombre: client.nombre,
      email: client.email,
      telefono: client.telefono,
      direccion: client.direccion
    });
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await clientApi.update(selectedId, formData);
      } else {
        await clientApi.save(formData);
      }
      setEditMode(false);
      setSelectedId(null);
      setFormData({ nombre: '', email: '', telefono: '', direccion: '' });
      loadClients();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = clients.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={(e) => setFormData({...formData, direccion: e.target.value})}
            className="border p-2 rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <Save size={16} />
          {editMode ? 'Actualizar' : 'Guardar'}
        </button>
      </form>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dirección</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{client.nombre}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.telefono}</td>
                <td className="px-6 py-4">{client.direccion}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(client)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="py-2 px-4">
          Página {currentPage} de {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ClientPage;