# ENTNT Dental Clinic Management System

A React-based web application for managing dental clinic operations including patient records, treatment incidents, appointments, and administrative tasks.

## 🚀 Features

### Admin Features
- **Dashboard**: Overview with revenue tracking, appointment statistics, and patient analytics
- **Patient Management**: CRUD operations for patient records with health information
- **Incident Management**: Track treatment incidents, appointments, and medical files
- **Calendar View**: Visual appointment scheduling with month/week/day views
- **Role-based Access**: Admin and Patient user roles with different interfaces

### Patient Features
- **Patient Portal**: Dedicated view for patient-specific information
- **Treatment History**: View past and upcoming appointments

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 with Vite 7.0.0
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.6.3
- **Forms**: React Hook Form 7.59.0 with Yup validation
- **Calendar**: React Big Calendar 1.19.4
- **Icons**: React Icons 5.5.0
- **Date Handling**: date-fns 4.1.0
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint 9.29.0

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd temp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Architecture

```
src/
├── components/          # Reusable UI components
│   ├── IncidentForm.jsx # Treatment incident form
│   └── PatientForm.jsx  # Patient registration form
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── data/               # Static data and mock data
│   └── mockData.json   # Initial data for localStorage
├── layouts/            # Layout components
│   └── AdminLayout.jsx # Admin dashboard layout
├── pages/              # Page components
│   ├── CalendarView.jsx # Appointment calendar
│   ├── Dashboard.jsx   # Admin dashboard
│   ├── Incidents.jsx   # Treatment management
│   ├── Login.jsx       # Authentication page
│   ├── Patients.jsx    # Patient management
│   └── PatientView.jsx # Patient portal
├── routes/             # Routing configuration
│   └── AppRouter.jsx   # Main router with role-based routes
├── utils/              # Utility functions
│   ├── initLocalStorage.js # Data initialization
│   └── storage.js      # localStorage helpers
└── App.jsx             # Root component
```

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full access to all features (dashboard, patients, incidents, calendar)
- **Patient**: Limited access to personal information only

### Default Credentials
```
Admin: admin@entnt.in / admin123
Patient: john@entnt.in / patient123
```

### Authentication Flow
1. User credentials stored in localStorage
2. Session management via AuthContext
3. Role-based route protection
4. Automatic redirect to login for unauthenticated users

## 💾 Data Management

### Storage Strategy
- **LocalStorage**: Primary data persistence
- **Mock Data**: Initial seed data for development
- **Real-time Updates**: Immediate UI updates on data changes

### Data Structure
```json
{
  "users": [
    {
      "id": "1",
      "role": "Admin",
      "email": "admin@entnt.in",
      "password": "admin123"
    }
  ],
  "patients": [
    {
      "id": "p1",
      "name": "John Doe",
      "dob": "1990-05-10",
      "contact": "1234567890",
      "healthInfo": "No allergies"
    }
  ],
  "incidents": [
    {
      "id": "i1",
      "patientId": "p1",
      "title": "Toothache",
      "description": "Upper molar pain",
      "appointmentDate": "2025-07-01T10:00:00",
      "cost": 80,
      "status": "Completed",
      "treatment": "Root canal",
      "files": [{"name": "xray.png", "url": "base64string"}]
    }
  ]
}
```

## 🎨 UI/UX Design

### Design System
- **Framework**: Tailwind CSS for utility-first styling
- **Color Scheme**: Blue primary theme with semantic colors
- **Layout**: Responsive design with sidebar navigation
- **Components**: Consistent button styles and form layouts

### Responsive Features
- Mobile-friendly navigation
- Responsive grid layouts
- Adaptive table displays

## 🔧 Technical Decisions

### 1. **Vite as Build Tool**
- **Rationale**: Faster development server and build times
- **Benefits**: Hot module replacement, optimized builds
- **Trade-offs**: Newer tool, smaller ecosystem than webpack

### 2. **LocalStorage for Data Persistence**
- **Rationale**: Simple setup, no backend required for demo
- **Benefits**: Works offline, immediate data access
- **Trade-offs**: Limited storage, no data synchronization

### 3. **React Context for State Management**
- **Rationale**: Simple authentication state, no complex state
- **Benefits**: Built-in React solution, easy to understand
- **Trade-offs**: Not suitable for complex state management

### 4. **Role-based Routing**
- **Rationale**: Different user experiences based on role
- **Benefits**: Security, tailored interfaces
- **Trade-offs**: More complex routing logic

### 5. **Component-based Architecture**
- **Rationale**: Reusable components, maintainable code
- **Benefits**: DRY principle, easy testing
- **Trade-offs**: Initial setup complexity

## 🐛 Known Issues & Limitations

### 1. **Security Concerns**
- **Issue**: Passwords stored in plain text
- **Impact**: High security risk in production
- **Solution**: Implement proper password hashing and backend authentication

### 2. **Data Persistence**
- **Issue**: Data lost on browser clear/localStorage limit
- **Impact**: User data not permanently stored
- **Solution**: Implement backend database with proper backup

### 3. **File Upload Limitations**
- **Issue**: File storage uses base64 strings
- **Impact**: Performance issues with large files
- **Solution**: Implement proper file storage service

### 4. **No Real-time Updates**
- **Issue**: Changes not synchronized across browser tabs
- **Impact**: Data inconsistency in multi-tab usage
- **Solution**: Implement WebSocket or polling for real-time updates

### 5. **Limited Validation**
- **Issue**: Basic form validation only
- **Impact**: Data integrity concerns
- **Solution**: Implement comprehensive validation rules

### 6. **No Offline Support**
- **Issue**: Application requires internet for initial load
- **Impact**: Poor user experience in low-connectivity areas
- **Solution**: Implement service workers and PWA features

## 🚀 Future Enhancements

### Phase 1: Backend Integration
- [ ] RESTful API development
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Proper authentication with JWT
- [ ] File upload service

### Phase 2: Advanced Features
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Email notifications

### Phase 3: Mobile & PWA
- [ ] Progressive Web App features
- [ ] Mobile-optimized interface
- [ ] Offline functionality
- [ ] Push notifications

## 📝 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Available Scripts
- dev: Vite development server
- build: Production build with Vite
- preview: Preview production build
- lint: ESLint code checking
```
---

