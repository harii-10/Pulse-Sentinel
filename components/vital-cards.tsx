"use client"

import React from "react"

import {
  Activity,
  Battery,
  Droplets,
  Footprints,
  Heart,
  MapPin,
  ShieldAlert,
  Wind,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { VitalData } from "@/lib/types"

interface VitalCardProps {
  title: string
  value: string | number
  unit?: string
  icon: React.ReactNode
  status: "normal" | "warning" | "critical"
  subtitle?: string
}

function VitalCard({ title, value, unit, icon, status, subtitle }: VitalCardProps) {
  const statusColors = {
    normal: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    critical: "border-destructive/30 bg-destructive/5",
  }

  const statusTextColors = {
    normal: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  }

  const statusBadgeVariants = {
    normal: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  }

  return (
    <Card className={cn("transition-all hover:shadow-md", statusColors[status])}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", statusColors[status])}>
          <div className={statusTextColors[status]}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className={cn("text-3xl font-bold", statusTextColors[status])}>
            {value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        <Badge variant="outline" className={cn("mt-2 text-xs", statusBadgeVariants[status])}>
          {status === "normal" ? "Normal" : status === "warning" ? "Elevated" : "Critical"}
        </Badge>
      </CardContent>
    </Card>
  )
}

function getHeartRateStatus(hr: number): "normal" | "warning" | "critical" {
  if (hr > 120) return "critical"
  if (hr > 100) return "warning"
  return "normal"
}

function getSpO2Status(spo2: number): "normal" | "warning" | "critical" {
  if (spo2 < 90) return "critical"
  if (spo2 < 95) return "warning"
  return "normal"
}

function getBPStatus(systolic: number, diastolic: number): "normal" | "warning" | "critical" {
  if (systolic > 140 || diastolic > 90) return "critical"
  if (systolic > 130 || diastolic > 85) return "warning"
  return "normal"
}

function getBatteryStatus(level: number): "normal" | "warning" | "critical" {
  if (level < 15) return "critical"
  if (level < 30) return "warning"
  return "normal"
}

interface VitalCardsGridProps {
  data: VitalData
}

export function VitalCardsGrid({ data }: VitalCardsGridProps) {
  const hrStatus = getHeartRateStatus(data.heartRate)
  const spo2Status = getSpO2Status(data.spo2)
  const bpStatus = getBPStatus(data.bloodPressure.systolic, data.bloodPressure.diastolic)
  const batteryStatus = getBatteryStatus(data.batteryLevel)

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <VitalCard
        title="Heart Rate"
        value={data.heartRate}
        unit="BPM"
        icon={<Heart className="h-5 w-5" />}
        status={hrStatus}
        subtitle="Last 5 min average"
      />
      
      <VitalCard
        title="Blood Oxygen (SpO2)"
        value={data.spo2}
        unit="%"
        icon={<Droplets className="h-5 w-5" />}
        status={spo2Status}
        subtitle="Oxygen saturation"
      />
      
      <VitalCard
        title="Blood Pressure"
        value={`${data.bloodPressure.systolic}/${data.bloodPressure.diastolic}`}
        unit="mmHg"
        icon={<Activity className="h-5 w-5" />}
        status={bpStatus}
        subtitle="Systolic/Diastolic"
      />
      
      <VitalCard
        title="Activity Level"
        value={data.activityLevel}
        unit="%"
        icon={<Wind className="h-5 w-5" />}
        status="normal"
        subtitle={`${data.steps.toLocaleString()} steps today`}
      />

      <VitalCard
        title="Steps Today"
        value={data.steps.toLocaleString()}
        icon={<Footprints className="h-5 w-5" />}
        status="normal"
        subtitle="Daily goal: 6,000"
      />
      
      <VitalCard
        title="Fall Detection"
        value={data.fallDetected ? "Alert!" : "Safe"}
        icon={<ShieldAlert className="h-5 w-5" />}
        status={data.fallDetected ? "critical" : "normal"}
        subtitle={data.fallDetected ? `Detected at ${new Date(data.fallTimestamp || '').toLocaleTimeString()}` : "No falls detected"}
      />
      
      <VitalCard
        title="Battery Level"
        value={data.batteryLevel}
        unit="%"
        icon={<Battery className="h-5 w-5" />}
        status={batteryStatus}
        subtitle="Device battery"
      />
      
      <VitalCard
        title="Location"
        value={data.location ? "Available" : "Unknown"}
        icon={<MapPin className="h-5 w-5" />}
        status={data.location ? "normal" : "warning"}
        subtitle={data.location ? `${data.location.lat.toFixed(4)}, ${data.location.lng.toFixed(4)}` : "GPS not available"}
      />
    </div>
  )
}
