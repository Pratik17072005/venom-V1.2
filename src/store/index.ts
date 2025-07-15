import { create } from 'zustand';
import { addDays, format } from 'date-fns';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  clientId: string;
  managerId: string;
  location: string;
  progress: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  projectsCount: number;
  totalValue: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hourlyRate: number;
  skills: string[];
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
}

export interface Schedule {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  projectId?: string;
  employeeId: string;
  type: 'meeting' | 'work' | 'inspection' | 'delivery';
}

interface AppStore {
  // State
  projects: Project[];
  clients: Client[];
  employees: Employee[];
  tasks: Task[];
  schedules: Schedule[];
  
  // Actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  addSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  updateSchedule: (id: string, updates: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
}

// Generate sample data
const generateSampleData = () => {
  const clients: Client[] = [
    {
      id: 'client-1',
      name: 'John Smith',
      email: 'john@email.com',
      phone: '+1-555-0123',
      company: 'Smith Enterprises',
      address: '123 Main St, City, State 12345',
      projectsCount: 2,
      totalValue: 750000,
    },
    {
      id: 'client-2',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1-555-0456',
      company: 'TechCorp Inc.',
      address: '456 Tech Ave, Silicon Valley, CA 94025',
      projectsCount: 1,
      totalValue: 1200000,
    },
    {
      id: 'client-3',
      name: 'Mike Wilson',
      email: 'mike@realestate.com',
      phone: '+1-555-0789',
      company: 'Wilson Real Estate',
      address: '789 Business Blvd, Downtown, NY 10001',
      projectsCount: 3,
      totalValue: 2100000,
    },
  ];

  const employees: Employee[] = [
    {
      id: 'emp-1',
      name: 'Alex Rodriguez',
      email: 'alex@company.com',
      phone: '+1-555-1111',
      role: 'Project Manager',
      department: 'Management',
      hourlyRate: 75,
      skills: ['Project Management', 'Construction', 'Leadership'],
    },
    {
      id: 'emp-2',
      name: 'Emma Davis',
      email: 'emma@company.com',
      phone: '+1-555-2222',
      role: 'Site Supervisor',
      department: 'Operations',
      hourlyRate: 55,
      skills: ['Site Management', 'Safety', 'Quality Control'],
    },
    {
      id: 'emp-3',
      name: 'James Brown',
      email: 'james@company.com',
      phone: '+1-555-3333',
      role: 'Electrician',
      department: 'Trade',
      hourlyRate: 45,
      skills: ['Electrical Work', 'Wiring', 'Safety'],
    },
    {
      id: 'emp-4',
      name: 'Lisa Chen',
      email: 'lisa@company.com',
      phone: '+1-555-4444',
      role: 'Architect',
      department: 'Design',
      hourlyRate: 85,
      skills: ['Design', 'CAD', 'Planning'],
    },
  ];

  const projects: Project[] = [
    {
      id: 'proj-1',
      name: 'Downtown Office Complex',
      description: 'Modern 15-story office building with retail space',
      status: 'active',
      priority: 'high',
      startDate: format(addDays(new Date(), -30), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 180), 'yyyy-MM-dd'),
      budget: 1200000,
      spent: 350000,
      clientId: 'client-2',
      managerId: 'emp-1',
      location: '456 Tech Ave, Silicon Valley, CA',
      progress: 25,
    },
    {
      id: 'proj-2',
      name: 'Residential Housing Development',
      description: '50-unit townhouse development with amenities',
      status: 'active',
      priority: 'medium',
      startDate: format(addDays(new Date(), -60), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 240), 'yyyy-MM-dd'),
      budget: 2100000,
      spent: 800000,
      clientId: 'client-3',
      managerId: 'emp-1',
      location: '789 Business Blvd, Downtown, NY',
      progress: 40,
    },
    {
      id: 'proj-3',
      name: 'Warehouse Renovation',
      description: 'Complete renovation of 50,000 sq ft warehouse',
      status: 'planning',
      priority: 'low',
      startDate: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 120), 'yyyy-MM-dd'),
      budget: 450000,
      spent: 15000,
      clientId: 'client-1',
      managerId: 'emp-1',
      location: '123 Main St, City, State',
      progress: 5,
    },
  ];

  const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Foundation Inspection',
      description: 'Inspect foundation work for building compliance',
      projectId: 'proj-1',
      assignedTo: 'emp-2',
      status: 'in-progress',
      priority: 'high',
      dueDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      estimatedHours: 8,
      actualHours: 6,
    },
    {
      id: 'task-2',
      title: 'Electrical Rough-in',
      description: 'Install electrical wiring for floors 1-5',
      projectId: 'proj-1',
      assignedTo: 'emp-3',
      status: 'todo',
      priority: 'medium',
      dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
      estimatedHours: 40,
    },
    {
      id: 'task-3',
      title: 'Design Review',
      description: 'Review and approve architectural plans for phase 2',
      projectId: 'proj-2',
      assignedTo: 'emp-4',
      status: 'review',
      priority: 'high',
      dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      estimatedHours: 12,
      actualHours: 10,
    },
  ];

  const schedules: Schedule[] = [
    {
      id: 'sched-1',
      title: 'Site Safety Meeting',
      description: 'Weekly safety briefing for all site workers',
      startTime: format(addDays(new Date(), 1), 'yyyy-MM-dd') + 'T08:00',
      endTime: format(addDays(new Date(), 1), 'yyyy-MM-dd') + 'T09:00',
      projectId: 'proj-1',
      employeeId: 'emp-2',
      type: 'meeting',
    },
    {
      id: 'sched-2',
      title: 'Client Presentation',
      description: 'Present progress update to client',
      startTime: format(addDays(new Date(), 2), 'yyyy-MM-dd') + 'T14:00',
      endTime: format(addDays(new Date(), 2), 'yyyy-MM-dd') + 'T15:30',
      projectId: 'proj-2',
      employeeId: 'emp-1',
      type: 'meeting',
    },
    {
      id: 'sched-3',
      title: 'Material Delivery',
      description: 'Delivery of steel beams for structure',
      startTime: format(addDays(new Date(), 3), 'yyyy-MM-dd') + 'T10:00',
      endTime: format(addDays(new Date(), 3), 'yyyy-MM-dd') + 'T12:00',
      projectId: 'proj-1',
      employeeId: 'emp-2',
      type: 'delivery',
    },
  ];

  return { clients, employees, projects, tasks, schedules };
};

const sampleData = generateSampleData();

export const useAppStore = create<AppStore>((set) => ({
  // Initial state with sample data
  projects: sampleData.projects,
  clients: sampleData.clients,
  employees: sampleData.employees,
  tasks: sampleData.tasks,
  schedules: sampleData.schedules,

  // Project actions
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: `proj-${Date.now()}` }],
    })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),

  // Client actions
  addClient: (client) =>
    set((state) => ({
      clients: [...state.clients, { ...client, id: `client-${Date.now()}` }],
    })),
  updateClient: (id, updates) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updates } : client
      ),
    })),
  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    })),

  // Employee actions
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, { ...employee, id: `emp-${Date.now()}` }],
    })),
  updateEmployee: (id, updates) =>
    set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === id ? { ...employee, ...updates } : employee
      ),
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    })),

  // Task actions
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: `task-${Date.now()}` }],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  // Schedule actions
  addSchedule: (schedule) =>
    set((state) => ({
      schedules: [...state.schedules, { ...schedule, id: `sched-${Date.now()}` }],
    })),
  updateSchedule: (id, updates) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updates } : schedule
      ),
    })),
  deleteSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== id),
    })),
}));