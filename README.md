# ElderWatch - Health Monitoring Dashboard

A comprehensive real-time health monitoring system designed for elderly care. ElderWatch provides continuous vital sign tracking, fall detection, family alerts, and AI-powered health insights in a modern, user-friendly web dashboard.

![Status Badge](https://img.shields.io/badge/Status-Active-brightgreen)
![Version Badge](https://img.shields.io/badge/Version-0.1.0-blue)
![License Badge](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Overview

ElderWatch is a modern health monitoring dashboard that helps families and caregivers keep track of elderly individuals' health metrics. The platform continuously monitors vital signs, detects falls, generates AI-powered health insights, and sends alerts to family members and doctors when critical conditions are detected.

### Key Features

- **📊 Real-Time Vital Monitoring**: Track heart rate, blood oxygen levels (SpO₂), blood pressure, and activity levels
- **🚨 Fall Detection**: Automatic fall detection with emergency notifications
- **🗺️ Location Tracking**: Real-time location mapping for enhanced safety
- **🤖 AI Health Insights**: Machine learning-powered analysis of health trends and patterns
- **📱 Battery Monitoring**: Device battery level tracking with low battery alerts
- **⚠️ Smart Alert System**: Multi-level alerts (mild, moderate, severe) for various health conditions
- **👥 Family & Doctor Integration**: Separate access for family members and doctors
- **📈 Historical Data Analysis**: Track health trends over time with detailed charts
- **🌐 Dark Mode Support**: Modern UI with theme switching capabilities
- **🔐 User Authentication**: Secure login system with password recovery
- **⚙️ Customizable Alerts**: Set custom thresholds for heart rate, blood pressure, SpO₂, and inactivity

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0.10 (React 19.2.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9 with PostCSS
- **UI Components**: Radix UI + Custom component library
- **Charts**: Recharts 2.15.4
- **Icons**: Lucide React 0.454.0
- **Form Handling**: React Hook Form 7.60.0 + Zod 3.25.76
- **Notifications**: Sonner 1.7.4
- **Carousel**: Embla Carousel React 8.5.1
- **Theming**: next-themes 0.4.6

### Development
- **Build Tool**: Next.js
- **Package Manager**: pnpm
- **Code Quality**: ESLint
- **Analytics**: Vercel Analytics

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm/yarn

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/elderwatch.git
cd HB_project
```

### Step 2: Install Dependencies
```bash
pnpm install
# or
npm install
```

### Step 3: Environment Setup
Create a `.env.local` file in the root directory (if needed for your backend):
```bash
# Add any required environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 4: Run Development Server
```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

---

## 📖 Usage Guide

### Accessing the Application

1. **Login Page** (`/login`)
   - Enter credentials to access the dashboard
   - Forgot password option available at `/forgot-password`

2. **Registration** (`/register`)
   - Create a new account for new users/family members

3. **Dashboard** (`/dashboard`)
   - Central hub for monitoring vital signs
   - Display of real-time vital cards with status indicators
   - AI health insights
   - Location map for the patient

### Dashboard Pages

#### Home Dashboard (`/dashboard`)
Displays:
- Real-time vital signs (Heart Rate, SpO₂, Blood Pressure, Activity Level, Steps)
- Fall detection status
- Device battery level
- Location on interactive map
- AI-powered health insights

#### Alerts (`/dashboard/alerts`)
View and manage all health alerts with:
- Alert severity levels (mild, moderate, severe)
- Alert history and timestamps
- Acknowledgment status
- Alert types (heart rate, SpO₂, blood pressure, fall, battery, inactivity)

#### History (`/dashboard/history`)
Analyze historical data with:
- 24-hour heart rate trends
- Blood pressure patterns
- SpO₂ trends
- Step count history
- Anomaly detection visualization

#### Profile (`/dashboard/profile`)
Manage personal health information:
- User demographics and medical history
- Emergency contact management
- Medication reminders
- Notification preferences

#### Settings (`/dashboard/settings`)
Configure application preferences:
- Alert thresholds (heart rate, blood pressure, SpO₂, inactivity)
- Notification channels (email, SMS, push, family alerts, doctor alerts)
- Privacy and security settings

---

## 🏗️ Project Structure

```
HB_project/
├── app/                          # Next.js app directory (route handlers)
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page (redirects to login)
│   ├── globals.css              # Global styles
│   ├── api/
│   │   └── vitals/
│   │       └── route.ts         # Vital data API endpoint
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── register/
│   │   └── page.tsx             # Registration page
│   ├── forgot-password/
│   │   └── page.tsx             # Password recovery page
│   └── dashboard/               # Protected dashboard routes
│       ├── layout.tsx           # Dashboard layout with sidebar
│       ├── page.tsx             # Main dashboard
│       ├── alerts/
│       │   └── page.tsx         # Alerts management page
│       ├── history/
│       │   └── page.tsx         # Historical data analysis page
│       ├── profile/
│       │   └── page.tsx         # User profile management page
│       └── settings/
│           └── page.tsx         # Settings configuration page
│
├── components/                   # React components
│   ├── vital-cards.tsx          # Vital signs display components
│   ├── vital-charts.tsx         # Chart components for trends
│   ├── ai-insights.tsx          # AI insights card
│   ├── location-map.tsx         # Location mapping component
│   ├── app-sidebar.tsx          # Navigation sidebar
│   ├── dashboard-header.tsx     # Dashboard header with refresh
│   ├── theme-provider.tsx       # Dark mode theme provider
│   └── ui/                      # Reusable UI components (40+ components)
│       ├── card.tsx             # Card component
│       ├── button.tsx           # Button component
│       ├── input.tsx            # Input field
│       ├── dialog.tsx           # Modal dialog
│       ├── sidebar.tsx          # Sidebar structure
│       ├── chart.tsx            # Chart wrapper
│       ├── table.tsx            # Data table
│       └── ... (40+ more components)
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── lib/                          # Utility functions and types
│   ├── types.ts                 # TypeScript interfaces and types
│   ├── utils.ts                 # Helper functions
│   └── mock-data.ts             # Mock data generators
│
├── public/                       # Static assets
├── styles/                       # Global stylesheets
│
├── components.json              # Shadcn UI component config
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🔑 Core Data Types

### VitalData Interface
```typescript
interface VitalData {
  heartRate: number                    // BPM
  spo2: number                        // Oxygen saturation %
  bloodPressure: {
    systolic: number                  // mmHg
    diastolic: number                 // mmHg
  }
  activityLevel: number               // 0-100%
  steps: number                       // Daily step count
  fallDetected: boolean               // Fall detection flag
  fallTimestamp?: string              // When fall was detected
  batteryLevel: number                // Device battery %
  location: { lat: number; lng: number } | null
  timestamp: string                   // ISO timestamp
}
```

### Alert Interface
```typescript
interface Alert {
  id: string
  type: 'heart_rate' | 'spo2' | 'blood_pressure' | 'fall' | 'battery' | 'inactivity'
  severity: 'mild' | 'moderate' | 'severe'
  title: string
  description: string
  value?: string
  timestamp: string
  acknowledged: boolean
}
```

### User Profile Interface
```typescript
interface UserProfile {
  id: string
  name: string
  age: number
  dateOfBirth: string
  medicalHistory: string[]
  emergencyContacts: EmergencyContact[]
  medications: MedicationReminder[]
}
```

---

## 🚀 Available Scripts

### Development
```bash
pnpm dev
# Starts development server with hot reload
# Access at http://localhost:3000
```

### Production Build
```bash
pnpm build
# Creates optimized production build
```

### Start Production Server
```bash
pnpm start
# Serves the production build
```

### Linting
```bash
pnpm lint
# Runs ESLint to check code quality
```

---

## 📊 Features in Detail

### Real-Time Vital Monitoring
- **Heart Rate**: Tracks with normal/warning/critical status indicators
- **Blood Pressure**: Systolic and diastolic readings
- **SpO₂ (Oxygen Saturation)**: Continuous monitoring of blood oxygen levels
- **Activity Level**: Percentage-based activity tracking
- **Steps**: Daily step count measurement

### Fall Detection System
- Automatic fall detection with timestamp recording
- Immediate emergency notifications to contacts
- Integration with location tracking for quick response

### AI Health Insights
- Trend analysis of vital signs
- Anomaly detection in health patterns
- Personalized health recommendations
- Risk assessment based on historical data

### Multi-Level Alert System
1. **Mild Alerts**: Informational alerts requiring acknowledgment
2. **Moderate Alerts**: Concerning trends requiring attention
3. **Severe Alerts**: Critical conditions requiring immediate action

### Location Mapping
- Real-time location tracking on interactive map
- Location history for safety monitoring
- Geofencing capabilities (future enhancement)

---

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Adaptive UI components

### Accessibility
- Semantic HTML
- ARIA attributes
- Keyboard navigation support
- High contrast mode support

### Dark Mode
- System preference detection
- Manual theme switching
- Persistent theme selection
- Smooth transitions

---

## 🔒 Security Considerations

- TypeScript for type safety
- Form validation with Zod
- Secure authentication flow
- Role-based access control (family, doctor, admin)
- Protected API routes
- Environment variable management

---

## 🔄 API Integration

### Current Implementation
The application uses mock data for demonstration purposes.

### Future API Endpoints
- `GET /api/vitals` - Fetch current vital signs
- `POST /api/vitals` - Submit vital data from device
- `GET /api/alerts` - Retrieve alert history
- `PUT /api/alerts/:id` - Acknowledge alerts
- `GET /api/history` - Historical data
- `POST /api/emergency/notify` - Emergency notifications

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## 🐛 Known Issues & Limitations

- Currently uses mock data for demonstration
- Fall detection requires hardware integration
- Location tracking requires device permissions
- Real-time notifications require backend implementation

---

## 🔮 Future Enhancements

- [ ] Backend API integration with real device data
- [ ] Wearable device integration (Apple Watch, Fitbit, etc.)
- [ ] SMS/Email notifications
- [ ] Video consultation with doctors
- [ ] Medication reminder notifications
- [ ] Advanced AI predictions
- [ ] Mobile native app
- [ ] Offline mode support
- [ ] Data export (PDF/CSV)
- [ ] Telemedicine integration

---

## 📝 Configuration Files

### next.config.mjs
```javascript
// Ignores TypeScript build errors (development only)
// Unoptimized images for broader compatibility
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES6",
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./*"] }
  }
}
```

### tailwind.config.js
- Custom color scheme
- Animation utilities
- Responsive breakpoints
- Dark mode support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Author & Support

**Project Name**: ElderWatch - Health Monitoring Dashboard  
**Version**: 0.1.0  
**Last Updated**: February 2026

### Getting Help
- 📧 Email: support@elderwatch.dev
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

## 🙏 Acknowledgments

- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling
- Next.js team for the excellent framework
- Recharts for beautiful chart visualizations
- All contributors and users

---

## 📞 Emergency Support

For critical health emergencies, always contact:
- Local Emergency Services (911 in US)
- Primary Care Physician
- Emergency Contacts on file

**This application is a monitoring tool and should not replace professional medical advice.**

---

Made with ❤️ for elderly care and family safety.
