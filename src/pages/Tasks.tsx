import React, { useState } from 'react';
import { useAppStore } from '../store';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Eye,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';
import { format, isToday, isPast } from 'date-fns';

const Tasks: React.FC = () => {
  const { tasks, projects, employees, updateTask, deleteTask } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesProject = projectFilter === 'all' || task.projectId === projectFilter;
    
    return matchesSearch && matchesPriority && matchesProject;
  });

  // Group tasks by status for Kanban view
  const tasksByStatus = {
    'todo': filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    'review': filteredTasks.filter(t => t.status === 'review'),
    'completed': filteredTasks.filter(t => t.status === 'completed'),
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo':
        return <Circle className="h-4 w-4 text-gray-500" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'review':
        return <Eye className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-500" />;
    }
  };

  const TaskCard: React.FC<{ task: any }> = ({ task }) => {
    const [showMenu, setShowMenu] = useState(false);
    const isOverdue = isPast(new Date(task.dueDate)) && task.status !== 'completed';
    const isDueToday = isToday(new Date(task.dueDate));

    return (
      <div className={`bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow ${
        isOverdue ? 'border-red-200 bg-red-50' : ''
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon(task.status)}
            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
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
                    Edit Task
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Task
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-2">{task.title}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-2" />
            <span>{getEmployeeName(task.assignedTo)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className={`h-3 w-3 mr-2 ${
              isOverdue ? 'text-red-500' : isDueToday ? 'text-yellow-500' : ''
            }`} />
            <span className={isOverdue ? 'text-red-600' : isDueToday ? 'text-yellow-600' : ''}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-2" />
            <span>{task.estimatedHours}h estimated</span>
            {task.actualHours && <span> • {task.actualHours}h actual</span>}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 truncate">{getProjectName(task.projectId)}</p>
        </div>
      </div>
    );
  };

  const KanbanColumn: React.FC<{ title: string; tasks: any[]; status: string }> = ({ title, tasks, status }) => (
    <div className="bg-gray-50 rounded-lg p-4 min-h-96">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Circle className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Track and manage project tasks</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('kanban')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                view === 'kanban' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
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
            <select
              className="input-field"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              <option value="all">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-600">{tasksByStatus.todo.length}</div>
          <div className="text-sm text-gray-600">To Do</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{tasksByStatus['in-progress'].length}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">{tasksByStatus.review.length}</div>
          <div className="text-sm text-gray-600">In Review</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{tasksByStatus.completed.length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Task View */}
      {view === 'kanban' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <KanbanColumn title="To Do" tasks={tasksByStatus.todo} status="todo" />
          <KanbanColumn title="In Progress" tasks={tasksByStatus['in-progress']} status="in-progress" />
          <KanbanColumn title="In Review" tasks={tasksByStatus.review} status="review" />
          <KanbanColumn title="Completed" tasks={tasksByStatus.completed} status="completed" />
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map(task => {
                  const isOverdue = isPast(new Date(task.dueDate)) && task.status !== 'completed';
                  return (
                    <tr key={task.id} className={isOverdue ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getProjectName(task.projectId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getEmployeeName(task.assignedTo)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={isOverdue ? 'text-red-600' : ''}>
                          {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(task.status)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">{task.status}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;