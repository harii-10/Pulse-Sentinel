import { NextRequest, NextResponse } from "next/server"

// Type for incoming vital data from ESP32 device
interface DeviceVitalData {
  hr: number // Heart rate in BPM
  spo2: number // Blood oxygen percentage
  bp: string // Blood pressure as "systolic/diastolic"
  fall: boolean // Fall detection status
  location?: {
    lat: number
    lng: number
  }
  battery?: number
  device_id?: string
  timestamp?: string
}

// In-memory storage for demo purposes
// In production, this would be stored in a database
const vitalDataStore: Map<string, DeviceVitalData[]> = new Map()

// POST: Receive vital data from ESP32 device
export async function POST(request: NextRequest) {
  try {
    const data: DeviceVitalData = await request.json()
    
    // Validate required fields
    if (typeof data.hr !== "number" || typeof data.spo2 !== "number" || typeof data.bp !== "string") {
      return NextResponse.json(
        { error: "Invalid data format. Required: hr (number), spo2 (number), bp (string)" },
        { status: 400 }
      )
    }

    // Parse blood pressure
    const [systolic, diastolic] = data.bp.split("/").map(Number)
    if (isNaN(systolic) || isNaN(diastolic)) {
      return NextResponse.json(
        { error: "Invalid blood pressure format. Expected: 'systolic/diastolic'" },
        { status: 400 }
      )
    }

    // Add timestamp if not provided
    const vitalRecord = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    }

    // Store the data (using device_id or 'default')
    const deviceId = data.device_id || "default"
    const existingData = vitalDataStore.get(deviceId) || []
    existingData.push(vitalRecord)
    
    // Keep only last 1000 records per device
    if (existingData.length > 1000) {
      existingData.shift()
    }
    vitalDataStore.set(deviceId, existingData)

    // Check for critical conditions and log alerts
    const alerts: string[] = []
    if (data.hr > 120) alerts.push("CRITICAL: High heart rate detected")
    if (data.hr < 50) alerts.push("CRITICAL: Low heart rate detected")
    if (data.spo2 < 90) alerts.push("CRITICAL: Low blood oxygen detected")
    if (systolic > 140 || diastolic > 90) alerts.push("WARNING: High blood pressure detected")
    if (data.fall) alerts.push("EMERGENCY: Fall detected!")

    console.log(`[ElderWatch API] Received vitals from device ${deviceId}:`, {
      heartRate: data.hr,
      spo2: data.spo2,
      bloodPressure: data.bp,
      fallDetected: data.fall,
      alerts,
    })

    return NextResponse.json({
      success: true,
      message: "Vital data received",
      alerts,
      timestamp: vitalRecord.timestamp,
    })
  } catch (error) {
    console.error("[ElderWatch API] Error processing vital data:", error)
    return NextResponse.json(
      { error: "Failed to process vital data" },
      { status: 500 }
    )
  }
}

// GET: Retrieve latest vital data
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const deviceId = searchParams.get("device_id") || "default"
    const limit = parseInt(searchParams.get("limit") || "1")

    const deviceData = vitalDataStore.get(deviceId) || []
    
    if (deviceData.length === 0) {
      // Return mock data if no real data available
      const mockData = {
        hr: Math.floor(Math.random() * 30) + 70,
        spo2: Math.floor(Math.random() * 4) + 95,
        bp: `${Math.floor(Math.random() * 20) + 115}/${Math.floor(Math.random() * 15) + 75}`,
        fall: false,
        location: {
          lat: 13.0827,
          lng: 80.2707,
        },
        battery: Math.floor(Math.random() * 50) + 50,
        timestamp: new Date().toISOString(),
      }
      
      return NextResponse.json({
        data: [mockData],
        isMock: true,
        message: "No real device data available. Returning mock data.",
      })
    }

    // Return the most recent data
    const recentData = deviceData.slice(-limit).reverse()

    return NextResponse.json({
      data: recentData,
      isMock: false,
      deviceId,
      totalRecords: deviceData.length,
    })
  } catch (error) {
    console.error("[ElderWatch API] Error retrieving vital data:", error)
    return NextResponse.json(
      { error: "Failed to retrieve vital data" },
      { status: 500 }
    )
  }
}
