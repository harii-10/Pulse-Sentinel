"use client"

import { useState } from "react"
import {
  Bell,
  Globe,
  Heart,
  Lock,
  Mail,
  MessageSquare,
  Save,
  Shield,
  Smartphone,
} from "lucide-react"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { AlertThresholds, NotificationPreferences } from "@/lib/types"

export default function SettingsPage() {
  const [thresholds, setThresholds] = useState<AlertThresholds>({
    heartRate: { min: 50, max: 100 },
    spo2: { min: 95 },
    bloodPressure: { systolicMax: 130, diastolicMax: 85 },
    inactivityMinutes: 60,
  })

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    email: true,
    sms: true,
    push: true,
    familyAlerts: true,
    doctorAlerts: true,
  })

  const [language, setLanguage] = useState("en")
  const [dataSharing, setDataSharing] = useState({
    anonymousAnalytics: true,
    shareWithFamily: true,
    shareWithDoctor: true,
  })

  const handleSave = () => {
    toast.success("Settings saved successfully")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Settings" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Alert Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Alert Thresholds
            </CardTitle>
            <CardDescription>
              Customize when you receive health alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Heart Rate */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Heart Rate Range (BPM)</Label>
                <span className="text-sm font-medium text-muted-foreground">
                  {thresholds.heartRate.min} - {thresholds.heartRate.max} BPM
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-12">Min</span>
                  <Slider
                    value={[thresholds.heartRate.min]}
                    onValueChange={([v]) =>
                      setThresholds({
                        ...thresholds,
                        heartRate: { ...thresholds.heartRate, min: v },
                      })
                    }
                    min={40}
                    max={80}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    {thresholds.heartRate.min} BPM
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-12">Max</span>
                  <Slider
                    value={[thresholds.heartRate.max]}
                    onValueChange={([v]) =>
                      setThresholds({
                        ...thresholds,
                        heartRate: { ...thresholds.heartRate, max: v },
                      })
                    }
                    min={80}
                    max={150}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    {thresholds.heartRate.max} BPM
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* SpO2 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Blood Oxygen Minimum (%)</Label>
                <span className="text-sm font-medium text-muted-foreground">
                  Alert below {thresholds.spo2.min}%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={[thresholds.spo2.min]}
                  onValueChange={([v]) =>
                    setThresholds({
                      ...thresholds,
                      spo2: { min: v },
                    })
                  }
                  min={85}
                  max={98}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-16 text-right">
                  {thresholds.spo2.min}%
                </span>
              </div>
            </div>

            <Separator />

            {/* Blood Pressure */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Blood Pressure Maximum (mmHg)</Label>
                <span className="text-sm font-medium text-muted-foreground">
                  Alert above {thresholds.bloodPressure.systolicMax}/{thresholds.bloodPressure.diastolicMax}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-16">Systolic</span>
                  <Slider
                    value={[thresholds.bloodPressure.systolicMax]}
                    onValueChange={([v]) =>
                      setThresholds({
                        ...thresholds,
                        bloodPressure: { ...thresholds.bloodPressure, systolicMax: v },
                      })
                    }
                    min={120}
                    max={160}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    {thresholds.bloodPressure.systolicMax}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-16">Diastolic</span>
                  <Slider
                    value={[thresholds.bloodPressure.diastolicMax]}
                    onValueChange={([v]) =>
                      setThresholds({
                        ...thresholds,
                        bloodPressure: { ...thresholds.bloodPressure, diastolicMax: v },
                      })
                    }
                    min={70}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    {thresholds.bloodPressure.diastolicMax}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Inactivity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Inactivity Alert (minutes)</Label>
                <span className="text-sm font-medium text-muted-foreground">
                  Alert after {thresholds.inactivityMinutes} min
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={[thresholds.inactivityMinutes]}
                  onValueChange={([v]) =>
                    setThresholds({ ...thresholds, inactivityMinutes: v })
                  }
                  min={15}
                  max={120}
                  step={15}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-16 text-right">
                  {thresholds.inactivityMinutes} min
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how you want to receive alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via email
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(v) =>
                  setNotifications({ ...notifications, email: v })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via SMS (Twilio)
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(v) =>
                  setNotifications({ ...notifications, sms: v })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app push notifications
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(v) =>
                  setNotifications({ ...notifications, push: v })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Bell className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Notify Family Members</p>
                  <p className="text-sm text-muted-foreground">
                    Send alerts to emergency contacts
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.familyAlerts}
                onCheckedChange={(v) =>
                  setNotifications({ ...notifications, familyAlerts: v })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Notify Doctor</p>
                  <p className="text-sm text-muted-foreground">
                    Send critical alerts to healthcare provider
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications.doctorAlerts}
                onCheckedChange={(v) =>
                  setNotifications({ ...notifications, doctorAlerts: v })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Language & Region
            </CardTitle>
            <CardDescription>
              Set your preferred language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label className="text-base">Display Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Privacy & Data Sharing
            </CardTitle>
            <CardDescription>
              Control how your health data is shared
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Anonymous Analytics</p>
                <p className="text-sm text-muted-foreground">
                  Help improve the app with anonymous usage data
                </p>
              </div>
              <Switch
                checked={dataSharing.anonymousAnalytics}
                onCheckedChange={(v) =>
                  setDataSharing({ ...dataSharing, anonymousAnalytics: v })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Share with Family Dashboard</p>
                <p className="text-sm text-muted-foreground">
                  Allow family members to view health data
                </p>
              </div>
              <Switch
                checked={dataSharing.shareWithFamily}
                onCheckedChange={(v) =>
                  setDataSharing({ ...dataSharing, shareWithFamily: v })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Share with Healthcare Provider</p>
                <p className="text-sm text-muted-foreground">
                  Allow your doctor to access health records
                </p>
              </div>
              <Switch
                checked={dataSharing.shareWithDoctor}
                onCheckedChange={(v) =>
                  setDataSharing({ ...dataSharing, shareWithDoctor: v })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </main>
    </div>
  )
}
