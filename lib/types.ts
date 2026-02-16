export interface VitalData {
  heartRate: number
  spo2: number
  bloodPressure: {
    systolic: number
    diastolic: number
  }
  activityLevel: number
  steps: number
  fallDetected: boolean
  fallTimestamp?: string
  batteryLevel: number
  location: {
    lat: number
    lng: number
  } | null
  timestamp: string
}

export interface Alert {
  id: string
  type: 'heart_rate' | 'spo2' | 'blood_pressure' | 'fall' | 'battery' | 'inactivity'
  severity: 'mild' | 'moderate' | 'severe'
  title: string
  description: string
  value?: string
  timestamp: string
  acknowledged: boolean
}

export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  isPrimary: boolean
}

export interface MedicationReminder {
  id: string
  name: string
  dosage: string
  times: string[]
  notes?: string
}

export interface UserProfile {
  id: string
  name: string
  age: number
  dateOfBirth: string
  medicalHistory: string[]
  emergencyContacts: EmergencyContact[]
  medications: MedicationReminder[]
}

export interface AlertThresholds {
  heartRate: { min: number; max: number }
  spo2: { min: number }
  bloodPressure: { systolicMax: number; diastolicMax: number }
  inactivityMinutes: number
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  familyAlerts: boolean
  doctorAlerts: boolean
}

export interface HistoricalData {
  timestamp: string
  heartRate: number
  spo2: number
  systolic: number
  diastolic: number
  steps: number
  anomaly?: boolean
}

export type UserRole = 'family' | 'doctor' | 'admin'
