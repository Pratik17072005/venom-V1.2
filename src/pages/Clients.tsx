import React, { useState } from 'react';
import { useAppStore } from '../store';
import {
  Plus,
  Search,
  Mail,
  Phone,
  Building,
  MapPin,
  DollarSign,
  FolderOpen,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';

const Clients: React.FC = () => {
  const { clients, projects, deleteClient } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientProjects = (clientId: string) => {
    return projects.filter(p => p.clientId === clientId);
  };

  const ClientCard: React.FC<{ client: any }> = ({ client }) => {
    const [showMenu, setShowMenu] = useState(false);
    const clientProjects = getClientProjects(client.id);
    const activeProjects = clientProjects.filter(p => p.status === 'active');

    return (
      <div className="card hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-primary-600">
                {client.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
              <p className="text-gray-600 font-medium">{client.company}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Client
                  </button>
                  <button 
                    onClick={() => deleteClient(client.id)}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Client
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-3 text-gray-400" />
            <a href={`mailto:${client.email}`} className="hover:text-primary-600">
              {client.email}
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-3 text-gray-400" />
            <a href={`tel:${client.phone}`} className="hover:text-primary-600">
              {client.phone}
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-3 text-gray-400" />
            <span>{client.address}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{client.projectsCount}</div>
              <div className="text-xs text-gray-500">Total Projects</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-primary-600">{activeProjects.length}</div>
              <div className="text-xs text-gray-500">Active Projects</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">
                ${(client.totalValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-gray-500">Total Value</div>
            </div>
          </div>
        </div>

        {clientProjects.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-900 mb-2">Recent Projects</div>
            <div className="space-y-2">
              {clientProjects.slice(0, 2).map(project => (
                <div key={project.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate">{project.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              ))}
              {clientProjects.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{clientProjects.length - 2} more projects
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client relationships and contacts</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Client
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search clients by name, company, or email..."
            className="pl-10 input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Client Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{clients.length}</div>
          <div className="text-sm text-gray-600">Total Clients</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {clients.filter(c => getClientProjects(c.id).some(p => p.status === 'active')).length}
          </div>
          <div className="text-sm text-gray-600">Active Clients</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {clients.reduce((sum, c) => sum + c.projectsCount, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Projects</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            ${(clients.reduce((sum, c) => sum + c.totalValue, 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-600">Total Value</div>
        </div>
      </div>

      {/* Clients Grid */}
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <Building className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Get started by adding your first client'
            }
          </p>
          {!searchTerm && (
            <button className="btn-primary mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Clients;