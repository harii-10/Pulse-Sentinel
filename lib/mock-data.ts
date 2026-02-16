import { VitalData, Alert, UserProfile, HistoricalData } from './types'

// Generate random vital data within normal ranges
export function generateMockVitalData(): VitalData {
  return {
    heartRate: Math.floor(Math.random() * 40) + 60, // 60-100
    spo2: Math.floor(Math.random() * 5) + 95, // 95-99
    bloodPressure: {
      systolic: Math.floor(Math.random() * 30) + 110, // 110-140
      diastolic: Math.floor(Math.random() * 20) + 70, // 70-90
    },
    activityLevel: Math.floor(Math.random() * 100),
    steps: Math.floor(Math.random() * 8000) + 1000,
    fallDetected: false,
    batteryLevel: Math.floor(Math.random() * 60) + 40, // 40-100
    location: {
      lat: 13.0827 + (Math.random() - 0.5) * 0.01,
      lng: 80.2707 + (Math.random() - 0.5) * 0.01,
    },
    timestamp: new Date().toISOString(),
  }
}

// Generate historical data for charts
export function generateHistoricalData(hours: number): HistoricalData[] {
  const data: HistoricalData[] = []
  const now = new Date()
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    const anomaly = Math.random() > 0.95 // 5% chance of anomaly
    
    data.push({
      timestamp: timestamp.toISOString(),
      heartRate: anomaly 
        ? Math.floor(Math.random() * 30) + 110 // Elevated if anomaly
        : Math.floor(Math.random() * 25) + 65,
      spo2: anomaly
        ? Math.floor(Math.random() * 5) + 88 // Low if anomaly
        : Math.floor(Math.random() * 4) + 95,
      systolic: Math.floor(Math.random() * 25) + 115,
      diastolic: Math.floor(Math.random() * 15) + 72,
      steps: Math.floor(Math.random() * 500) + 100,
      anomaly,
    })
  }
  
  return data
}

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'heart_rate',
    severity: 'moderate',
    title: 'Elevated Heart Rate',
    description: 'Heart rate detected at 112 BPM, above normal threshold of 100 BPM.',
    value: '112 BPM',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
  {
    id: '2',
    type: 'spo2',
    severity: 'mild',
    title: 'SpO2 Slightly Low',
    description: 'Blood oxygen level at 94%, slightly below optimal range.',
    value: '94%',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    acknowledged: true,
  },
  {
    id: '3',
    type: 'inactivity',
    severity: 'mild',
    title: 'Extended Inactivity',
    description: 'No significant movement detected for 45 minutes.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    acknowledged: true,
  },
  {
    id: '4',
    type: 'blood_pressure',
    severity: 'moderate',
    title: 'High Blood Pressure',
    description: 'Blood pressure reading of 145/95 mmHg detected.',
    value: '145/95 mmHg',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
  {
    id: '5',
    type: 'battery',
    severity: 'mild',
    title: 'Low Battery Warning',
    description: 'Device battery at 20%. Please charge soon.',
    value: '20%',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    acknowledged: true,
  },
]

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Rajesh Kumar',
  age: 72,
  dateOfBirth: '1954-03-15',
  medicalHistory: [
    'Type 2 Diabetes (diagnosed 2010)',
    'Hypertension (diagnosed 2008)',
    'Mild Arthritis',
  ],
  emergencyContacts: [
    {
      id: '1',
      name: 'Priya Kumar',
      relationship: 'Daughter',
      phone: '+91 98765 43210',
      email: 'priya.kumar@email.com',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Dr. Suresh Menon',
      relationship: 'Primary Physician',
      phone: '+91 98765 12345',
      email: 'dr.menon@hospital.com',
      isPrimary: false,
    },
    {
      id: '3',
      name: 'Amit Kumar',
      relationship: 'Son',
      phone: '+91 87654 32109',
      email: 'amit.kumar@email.com',
      isPrimary: false,
    },
  ],
  medications: [
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      times: ['08:00', '20:00'],
      notes: 'Take with meals',
    },
    {
      id: '2',
      name: 'Amlodipine',
      dosage: '5mg',
      times: ['09:00'],
      notes: 'For blood pressure',
    },
    {
      id: '3',
      name: 'Aspirin',
      dosage: '75mg',
      times: ['08:00'],
      notes: 'After breakfast',
    },
  ],
}

// AI Insights based on trends
export function generateAIInsights(data: HistoricalData[]): string[] {
  const insights: string[] = []
  
  const avgHeartRate = data.reduce((sum, d) => sum + d.heartRate, 0) / data.length
  const avgSpo2 = data.reduce((sum, d) => sum + d.spo2, 0) / data.length
  const totalSteps = data.reduce((sum, d) => sum + d.steps, 0)
  
  if (avgHeartRate > 85) {
    insights.push('Heart rate trending higher than usual. Consider relaxation exercises.')
  }
  
  if (avgSpo2 < 96) {
    insights.push('Blood oxygen levels slightly below optimal. Deep breathing exercises recommended.')
  }
  
  if (totalSteps < 3000) {
    insights.push('Activity level is low today. A short walk would be beneficial.')
  } else if (totalSteps > 6000) {
    insights.push('Great activity level! Keep up the healthy movement.')
  }
  
  insights.push('Hydration reminder: Aim for 8 glasses of water today.')
  
  return insights
}
