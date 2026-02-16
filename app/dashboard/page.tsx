"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { VitalCardsGrid } from "@/components/vital-cards"
import { AIInsightsCard } from "@/components/ai-insights"
import { LocationMap } from "@/components/location-map"
import { generateMockVitalData, generateHistoricalData, generateAIInsights } from "@/lib/mock-data"
import type { VitalData } from "@/lib/types"

export default function DashboardPage() {
  const [vitalData, setVitalData] = useState<VitalData | null>(null)
  const [insights, setInsights] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchVitalData = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call - in production, this would fetch from /api/vitals
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      const data = generateMockVitalData()
      const historicalData = generateHistoricalData(24)
      const newInsights = generateAIInsights(historicalData)
      
      setVitalData(data)
      setInsights(newInsights)
      setLastUpdate(new Date())
      
      // Check for critical conditions and show toast
      if (data.heartRate > 120) {
        toast.error("Critical: High Heart Rate Detected", {
          description: `Heart rate is ${data.heartRate} BPM. Consider medical attention.`,
        })
      }
      if (data.spo2 < 90) {
        toast.error("Critical: Low Blood Oxygen", {
          description: `SpO2 is ${data.spo2}%. Seek medical attention immediately.`,
        })
      }
      if (data.fallDetected) {
        toast.error("Fall Detected!", {
          description: "A fall has been detected. Emergency contacts notified.",
        })
      }
    } catch {
      toast.error("Connection Error", {
        description: "Failed to fetch vital data. Please check device connection.",
      })
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchVitalData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchVitalData, 30000)
    return () => clearInterval(interval)
  }, [fetchVitalData])

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader 
        title="Dashboard" 
        onRefresh={fetchVitalData}
        isRefreshing={isRefreshing}
      />
      
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Last Update Info */}
        {lastUpdate && (
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()} 
            <span className="ml-2 inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Live
            </span>
          </p>
        )}

        {/* Vital Signs Grid */}
        {vitalData ? (
          <VitalCardsGrid data={vitalData} />
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-lg bg-muted/30 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Bottom Section: AI Insights & Location */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AIInsightsCard insights={insights} />
          <LocationMap location={vitalData?.location || null} />
        </div>

        {/* Emergency Actions */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-destructive">Emergency Actions</h3>
              <p className="text-sm text-muted-foreground">
                Quick actions for emergency situations
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toast.success("Emergency contacts notified")}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 transition-colors"
              >
                Notify Family
              </button>
              <button
                onClick={() => toast.success("Connecting to emergency services...")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Call Doctor
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
