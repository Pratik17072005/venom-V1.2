import React, { useState } from 'react';
import { useAppStore } from '../store';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Pause,
} from 'lucide-react';
import { format } from 'date-fns';

const Projects: React.FC = () => {
  const { projects, clients, employees, updateProject, deleteProject } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'planning':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'on-hold':
        return <Pause className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const getManagerName = (managerId: string) => {
    const manager = employees.find(e => e.id === managerId);
    return manager ? manager.name : 'Unassigned';
  };

  const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div className="card hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium">Client:</span>
                <span className="ml-1">{getClientName(project.clientId)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{format(new Date(project.startDate), 'MMM dd, yyyy')} - {format(new Date(project.endDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="relative ml-4">
            <div className="flex items-center space-x-2">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="ml-1 capitalize">{project.status}</span>
              </div>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Project
                  </button>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage and track your construction projects</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="input-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="input-field"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first project'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && (
            <button className="btn-primary mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </button>
          )}
        </div>
      )}

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {projects.filter(p => p.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Projects</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {projects.filter(p => p.status === 'planning').length}
          </div>
          <div className="text-sm text-gray-600">In Planning</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {projects.filter(p => p.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900">
            ${(projects.reduce((sum, p) => sum + p.budget, 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-600">Total Budget</div>
        </div>
      </div>
    </div>
  );
};

export default Projects;