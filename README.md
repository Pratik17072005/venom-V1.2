# ConstructPro - Smart Construction Management System

A comprehensive web application for construction and service management, built with React, TypeScript, and Tailwind CSS.

## Features

### 🏗️ **Project Management**
- Create, view, and manage construction projects
- Track project progress with visual progress bars
- Monitor budget vs. actual spending
- Filter projects by status and priority
- Detailed project information including location, dates, and assigned managers

### 👥 **Client Management**
- Maintain comprehensive client database
- Track client contact information and project history
- View client project portfolios and total contract values
- Quick access to client communication (email/phone)

### ✅ **Task Management**
- Kanban board and list view for task tracking
- Task assignment and priority management
- Due date tracking with overdue notifications
- Time estimation and actual time logging
- Task filtering by project, priority, and status

### 📊 **Dashboard & Analytics**
- Real-time project statistics and KPIs
- Budget vs. spending visualizations
- Project status distribution charts
- Recent activity tracking
- Today's schedule overview

### 🗓️ **Schedule Management**
- Calendar integration for project scheduling
- Meeting and delivery tracking
- Employee schedule management
- Project milestone planning

### 👷 **Employee Management**
- Employee profiles with skills and hourly rates
- Department and role organization
- Task assignment tracking
- Performance metrics

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd construction-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built application will be in the `dist` folder.

## Project Structure

```
construction-manager/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Layout.tsx      # Main layout with navigation
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── Projects.tsx    # Project management
│   │   ├── Clients.tsx     # Client management
│   │   └── Tasks.tsx       # Task management
│   ├── store/              # State management
│   │   └── index.ts        # Zustand store with sample data
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── vite.config.ts          # Vite build configuration
```

## Key Features in Detail

### Dashboard
- **Quick Stats**: Active projects, total budget, budget utilization, total clients
- **Visual Charts**: Budget vs spending comparison, project status distribution
- **Activity Feed**: Recent tasks and schedule updates
- **Today's Schedule**: Upcoming meetings and deliveries

### Project Management
- **Project Cards**: Visual project overview with progress tracking
- **Status Management**: Planning, Active, On Hold, Completed
- **Priority Levels**: High, Medium, Low priority classification
- **Budget Tracking**: Real-time budget vs. actual spending
- **Client Association**: Link projects to specific clients

### Task Management
- **Kanban Board**: Drag-and-drop task management (visual only)
- **List View**: Tabular view with sorting and filtering
- **Priority System**: Color-coded priority levels
- **Due Date Tracking**: Overdue task highlighting
- **Time Tracking**: Estimated vs. actual hours

### Client Management
- **Contact Information**: Complete client profiles
- **Project Portfolio**: Track all client projects
- **Financial Overview**: Total contract values per client
- **Communication Tools**: Direct email and phone links

## Sample Data

The application comes pre-loaded with sample data including:
- 3 sample clients with contact information
- 3 construction projects in different stages
- 4 team members with different roles
- Sample tasks assigned to projects
- Schedule items for the coming days

## Customization

### Styling
The application uses Tailwind CSS with a custom design system. You can modify:
- Colors in `tailwind.config.js`
- Custom component styles in `src/index.css`
- Layout and spacing throughout the components

### Data Structure
Sample data is defined in `src/store/index.ts`. You can:
- Modify the data interfaces for your specific needs
- Add new fields to projects, clients, or tasks
- Extend the store with additional state management

### Navigation
Add new pages by:
1. Creating a new component in `src/pages/`
2. Adding a route in `src/App.tsx`
3. Adding navigation item in `src/components/Layout.tsx`

## Future Enhancements

- [ ] Employee management page
- [ ] Advanced scheduling with calendar integration
- [ ] Analytics and reporting dashboard
- [ ] Document management system
- [ ] Equipment tracking
- [ ] Invoice and billing integration
- [ ] Real-time notifications
- [ ] Mobile app support
- [ ] Data export/import functionality
- [ ] Advanced project templates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact the development team or create an issue in the repository.

---

**ConstructPro** - Streamlining construction management with modern web technology.
