"use client"

import React from "react"

import { useState } from "react"
import { format } from "date-fns"
import {
  Activity,
  AlertTriangle,
  Battery,
  Bell,
  Check,
  Droplets,
  Heart,
  Phone,
  ShieldAlert,
  Users,
} from "lucide-react"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { mockAlerts } from "@/lib/mock-data"
import type { Alert } from "@/lib/types"

const alertIcons: Record<Alert["type"], React.ReactNode> = {
  heart_rate: <Heart className="h-5 w-5" />,
  spo2: <Droplets className="h-5 w-5" />,
  blood_pressure: <Activity className="h-5 w-5" />,
  fall: <ShieldAlert className="h-5 w-5" />,
  battery: <Battery className="h-5 w-5" />,
  inactivity: <AlertTriangle className="h-5 w-5" />,
}

const severityColors = {
  mild: "bg-warning/10 text-warning border-warning/30",
  moderate: "bg-orange-500/10 text-orange-600 border-orange-500/30",
  severe: "bg-destructive/10 text-destructive border-destructive/30",
}

const severityBadgeColors = {
  mild: "bg-warning/10 text-warning",
  moderate: "bg-orange-500/10 text-orange-600",
  severe: "bg-destructive/10 text-destructive",
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged)
  const acknowledgedAlerts = alerts.filter((a) => a.acknowledged)

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId ? { ...a, acknowledged: true } : a
      )
    )
    toast.success("Alert acknowledged")
  }

  const notifyFamily = (alert: Alert) => {
    toast.success("Family Notified", {
      description: `Emergency contacts have been notified about: ${alert.title}`,
    })
  }

  const callDoctor = () => {
    toast.info("Connecting to Doctor", {
      description: "Initiating call to Dr. Suresh Menon...",
    })
  }

  const renderAlertCard = (alert: Alert) => (
    <AccordionItem
      key={alert.id}
      value={alert.id}
      className={cn(
        "border rounded-lg mb-3 overflow-hidden",
        severityColors[alert.severity]
      )}
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-black/5 dark:hover:bg-white/5">
        <div className="flex items-center gap-3 text-left">
          <div className={cn("p-2 rounded-lg", severityColors[alert.severity])}>
            {alertIcons[alert.type]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">{alert.title}</span>
              <Badge className={severityBadgeColors[alert.severity]}>
                {alert.severity}
              </Badge>
              {!alert.acknowledged && (
                <Badge variant="destructive" className="animate-pulse">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {format(new Date(alert.timestamp), "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          <p className="text-sm">{alert.description}</p>
          
          {alert.value && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Recorded Value:</span>
              <span className="font-semibold">{alert.value}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {!alert.acknowledged && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => acknowledgeAlert(alert.id)}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Acknowledge
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => notifyFamily(alert)}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              Notify Family
            </Button>
            <Button
              size="sm"
              onClick={callDoctor}
              className="gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Doctor
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Alerts" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Alert Summary */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unacknowledged
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-destructive">
                  {unacknowledgedAlerts.length}
                </span>
                <Bell className="h-5 w-5 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/30 bg-warning/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-warning">
                  {alerts.length}
                </span>
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/30 bg-success/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Acknowledged
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-success">
                  {acknowledgedAlerts.length}
                </span>
                <Check className="h-5 w-5 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Tiers Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Alert Severity Levels</CardTitle>
            <CardDescription>Understanding alert classifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                <Badge className="bg-warning/10 text-warning">Mild</Badge>
                <p className="text-sm text-muted-foreground">
                  App notification only. No immediate action required.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <Badge className="bg-orange-500/10 text-orange-600">Moderate</Badge>
                <p className="text-sm text-muted-foreground">
                  Email notification sent. Monitor closely.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                <Badge className="bg-destructive/10 text-destructive">Severe</Badge>
                <p className="text-sm text-muted-foreground">
                  SMS + Email alert. Immediate attention required.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Tabs defaultValue="unacknowledged" className="space-y-4">
          <TabsList>
            <TabsTrigger value="unacknowledged" className="gap-2">
              Unacknowledged
              {unacknowledgedAlerts.length > 0 && (
                <Badge variant="destructive" className="h-5 w-5 p-0 justify-center">
                  {unacknowledgedAlerts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="unacknowledged">
            {unacknowledgedAlerts.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-2">
                {unacknowledgedAlerts.map(renderAlertCard)}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Check className="h-12 w-12 text-success mb-4" />
                  <p className="text-lg font-medium">All caught up!</p>
                  <p className="text-sm text-muted-foreground">
                    No unacknowledged alerts at this time.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="acknowledged">
            <Accordion type="single" collapsible className="space-y-2">
              {acknowledgedAlerts.map(renderAlertCard)}
            </Accordion>
          </TabsContent>

          <TabsContent value="all">
            <Accordion type="single" collapsible className="space-y-2">
              {alerts.map(renderAlertCard)}
            </Accordion>
          </TabsContent>
        </Tabs>

        {/* Real-time Connection Status */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium">Real-time Connection Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                WebSocket connected - Alerts update automatically
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
