import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';

// Placeholder components for remaining pages
const Employees = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
    <div className="card">
      <p className="text-gray-600">Employee management page coming soon...</p>
    </div>
  </div>
);

const Schedule = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
    <div className="card">
      <p className="text-gray-600">Schedule management page coming soon...</p>
    </div>
  </div>
);

const Analytics = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
    <div className="card">
      <p className="text-gray-600">Analytics and reporting page coming soon...</p>
    </div>
  </div>
);

const Settings = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
    <div className="card">
      <p className="text-gray-600">Settings page coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="clients" element={<Clients />} />
          <Route path="employees" element={<Employees />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;