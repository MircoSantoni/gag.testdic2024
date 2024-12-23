import React, { useState, useEffect } from 'react';
import { clientApi } from '../api/Client';
import { ChevronLeft, ChevronRight, Trash2, Edit, Save, Search, ChevronsLeft, ChevronsRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const GENDER_OPTIONS = {
  MALE: "Male",
  FEMALE: "Female",
  AGENDER: "Agender",
  BIGENDER: "Bigender",
  NON_BINARY: "Non-binary",
  GENDER_FLUID: "Genderfluid",
  POLYGENDER: "Polygender",
  GENDERQUEER: "Genderqueer"
};

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    ipAddress: '',
    country: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const itemsPerPage = 10;

  const validations = {
    firstName: /^[A-Za-zÀ-ÿ\s]{2,30}$/,
    lastName: /^[A-Za-zÀ-ÿ\s]{2,30}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    country: /^[A-Za-zÀ-ÿ\s]{2,56}$/,
    ipAddress: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  };

  useEffect(() => {
    loadClients();
  }, [currentPage, searchTerm, searchType]);

  const loadClients = async () => {
    try {
      setLoading(true);
      let filteredClients = [];

      if (searchType === 'id' && searchTerm.trim()) {
        try {
          const client = await clientApi.getById(searchTerm);
          filteredClients = client ? [client] : [];
        } catch (error) {
          filteredClients = [];
        }
      } else {
        const response = await clientApi.getAll();
        filteredClients = response.filter(client =>
          Object.values(client).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      setTotalPages(Math.ceil(filteredClients.length / itemsPerPage));

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setClients(filteredClients.slice(startIndex, endIndex));
    } catch (error) {
      console.error('Algo salio mal cargando los clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    if (!validations[name]) return true;
    return validations[name].test(value);
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (!validateField(key, formData[key])) {
        errors[key] = `Invalid ${key} format`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Estas seguro de eliminar este cliente?')) {
      try {
        await clientApi.delete(id);
        toast.success('Cliente eliminado exitosamente', {
          duration: 3000,
          position: 'top-center',
          icon: '🗑️',
        });
        loadClients();
      } catch (error) {
        toast.error('Error al eliminar el cliente: ' + error.message, {
          duration: 4000,
          position: 'top-center',
        });
        console.error('Algo salio mal eliminando este cliente:', error);
      }
    }
  };

  const handleEdit = async (client) => {
    try {
      const fullClient = await clientApi.getById(client.id);
      setSelectedClient(fullClient);
      setFormData({
        firstName: fullClient.firstName,
        lastName: fullClient.lastName,
        email: fullClient.email,
        gender: fullClient.gender,
        ipAddress: fullClient.ipAddress,
        country: fullClient.country
      });
      setFormErrors({});
      toast.success('Cliente cargado para edición', {
        duration: 2000,
        position: 'top-center',
        icon: '✏️',
      });
    } catch (error) {
      toast.error('Error al cargar el cliente: ' + error.message, {
        duration: 4000,
        position: 'top-center',
      });
      console.error('Algo salio mal cargando ese cliente:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario', {
        duration: 4000,
        position: 'top-center',
        icon: '⚠️',
      });
      return;
    }

    const loadingToast = toast.loading(
      selectedClient ? 'Actualizando cliente...' : 'Agregando nuevo cliente...', 
      { position: 'top-center' }
    );

    try {
      if (selectedClient) {
        await clientApi.update(selectedClient.id, formData);
        toast.success('Cliente actualizado exitosamente', {
          duration: 3000,
          position: 'top-center',
          icon: '✅',
        });
      } else {
        await clientApi.save(formData);
        console.log(formData)
        toast.success('Nuevo cliente agregado exitosamente', {
          duration: 3000,
          position: 'top-center',
          icon: '✨',
        });
      }
      setSelectedClient(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        ipAddress: '',
        country: ''
      });
      setFormErrors({});
      loadClients();
    } catch (error) {
      toast.error(
        `Error al ${selectedClient ? 'actualizar' : 'agregar'} el cliente: ${error.message}`, 
        {
          duration: 4000,
          position: 'top-center',
        }
      );
      console.error('Algo salio mal al guardar el cliente:', error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validateField(name, value)) {
      setFormErrors({ ...formErrors, [name]: '' });
    } else {
      setFormErrors({ ...formErrors, [name]: `Invalid ${name} format` });
    }
  };

  const jumpToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    
    <div className="container mx-auto p-4 space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold">Clientes</h1>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={searchType === 'id' ? "Buscar por ID..." : "Buscar clientes..."}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-2 top-2">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="id">Buscar por ID</option>
          <option value="text">Buscar por texto</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.firstName ? 'border-red-500' : ''}`}
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.lastName ? 'border-red-500' : ''}`}
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.email ? 'border-red-500' : ''}`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            {Object.entries(GENDER_OPTIONS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <div>
            <input
              type="text"
              name="ipAddress"
              placeholder="IP Address"
              value={formData.ipAddress}
              onChange={handleInputChange}
              required
              className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.ipAddress ? 'border-red-500' : ''}`}
            />
            {formErrors.ipAddress && (
              <p className="text-red-500 text-sm mt-1">{formErrors.ipAddress}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="country"
              placeholder="Pais"
              value={formData.country}
              onChange={handleInputChange}
              required
              className={`p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.country ? 'border-red-500' : ''}`}
            />
            {formErrors.country && (
              <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2 inline" />
          {selectedClient ? 'Update Client' : 'Add Client'}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.firstName} {client.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.ipAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.country}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(client)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(client.id)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => jumpToPage(parseInt(e.target.value))}
            className="w-16 text-center p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500">
            of {totalPages}
          </span>
        </div>

        <button
          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ClientPage;