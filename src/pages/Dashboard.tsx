import React from 'react';
import { useAppStore } from '../store';
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

const Dashboard: React.FC = () => {
  const { projects, clients, employees, tasks, schedules } = useAppStore();

  // Calculate statistics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalClients = clients.length;
  const totalEmployees = employees.length;

  // Task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  };

  // Today's schedules
  const todaySchedules = schedules.filter(s => 
    isToday(parseISO(s.startTime.split('T')[0]))
  );

  // Project status distribution for pie chart
  const projectStatusData = [
    { name: 'Active', value: projects.filter(p => p.status === 'active').length, color: '#3b82f6' },
    { name: 'Planning', value: projects.filter(p => p.status === 'planning').length, color: '#f59e0b' },
    { name: 'On Hold', value: projects.filter(p => p.status === 'on-hold').length, color: '#ef4444' },
    { name: 'Completed', value: projects.filter(p => p.status === 'completed').length, color: '#10b981' },
  ];

  // Budget vs spent data for bar chart
  const budgetData = projects.map(project => ({
    name: project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name,
    budget: project.budget,
    spent: project.spent,
  }));

  // Recent activities (mock data based on tasks and schedules)
  const recentActivities = [
    ...tasks.slice(0, 3).map(task => ({
      id: task.id,
      type: 'task',
      title: `Task updated: ${task.title}`,
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600',
    })),
    ...schedules.slice(0, 2).map(schedule => ({
      id: schedule.id,
      type: 'schedule',
      title: `Scheduled: ${schedule.title}`,
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-blue-600',
    })),
  ].slice(0, 5);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    change?: string;
    changeType?: 'positive' | 'negative';
  }> = ({ title, value, icon: Icon, change, changeType }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-100 rounded-full">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value={activeProjects}
          icon={Activity}
          change="+12% from last month"
          changeType="positive"
        />
        <StatCard
          title="Total Budget"
          value={`$${(totalBudget / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          change="+8% from last month"
          changeType="positive"
        />
        <StatCard
          title="Budget Utilization"
          value={`${((totalSpent / totalBudget) * 100).toFixed(1)}%`}
          icon={TrendingUp}
          change="+5% from last month"
          changeType="positive"
        />
        <StatCard
          title="Total Clients"
          value={totalClients}
          icon={Users}
          change="+2 new this month"
          changeType="positive"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Spent Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
              <Bar dataKey="budget" fill="#e5e7eb" name="Budget" />
              <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Summary */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Tasks</span>
              <span className="font-semibold">{taskStats.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="font-semibold text-green-600">{taskStats.completed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In Progress</span>
              <span className="font-semibold text-blue-600">{taskStats.inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overdue</span>
              <span className="font-semibold text-red-600">{taskStats.overdue}</span>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {todaySchedules.length > 0 ? (
              todaySchedules.map(schedule => (
                <div key={schedule.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {schedule.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(parseISO(schedule.startTime), 'HH:mm')} - {format(parseISO(schedule.endTime), 'HH:mm')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No schedules for today</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;