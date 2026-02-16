"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { CalendarIcon, Download, AlertTriangle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  HeartRateChart,
  SpO2Chart,
  BloodPressureChart,
  StepsChart,
} from "@/components/vital-charts"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { generateHistoricalData } from "@/lib/mock-data"
import type { HistoricalData } from "@/lib/types"

type TimeRange = "24h" | "7d" | "30d"

export default function HistoryPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("24h")
  const [date, setDate] = useState<Date | undefined>(new Date())

  const historicalData = useMemo<HistoricalData[]>(() => {
    const hours = timeRange === "24h" ? 24 : timeRange === "7d" ? 168 : 720
    return generateHistoricalData(hours)
  }, [timeRange])

  const tableData = useMemo(() => {
    // Sample every few entries for table display
    const step = timeRange === "24h" ? 1 : timeRange === "7d" ? 6 : 24
    return historicalData.filter((_, i) => i % step === 0).slice(0, 20)
  }, [historicalData, timeRange])

  const exportData = () => {
    const csvContent = [
      ["Timestamp", "Heart Rate", "SpO2", "Systolic", "Diastolic", "Steps", "Anomaly"],
      ...historicalData.map((d) => [
        d.timestamp,
        d.heartRate,
        d.spo2,
        d.systolic,
        d.diastolic,
        d.steps,
        d.anomaly ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `health-data-${timeRange}-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="History & Trends" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={exportData} variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Charts */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Vitals</TabsTrigger>
            <TabsTrigger value="heart">Heart Rate</TabsTrigger>
            <TabsTrigger value="oxygen">Blood Oxygen</TabsTrigger>
            <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <HeartRateChart data={historicalData} timeRange={timeRange} />
              <SpO2Chart data={historicalData} timeRange={timeRange} />
              <BloodPressureChart data={historicalData} timeRange={timeRange} />
              <StepsChart data={historicalData} timeRange={timeRange} />
            </div>
          </TabsContent>

          <TabsContent value="heart">
            <HeartRateChart data={historicalData} timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="oxygen">
            <SpO2Chart data={historicalData} timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="bp">
            <BloodPressureChart data={historicalData} timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="activity">
            <StepsChart data={historicalData} timeRange={timeRange} />
          </TabsContent>
        </Tabs>

        {/* Historical Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Historical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>SpO2</TableHead>
                    <TableHead>Blood Pressure</TableHead>
                    <TableHead>Steps</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {format(new Date(record.timestamp), "MMM d, h:mm a")}
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          record.heartRate > 100 && "text-destructive font-medium"
                        )}>
                          {record.heartRate} BPM
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          record.spo2 < 95 && "text-destructive font-medium"
                        )}>
                          {record.spo2}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          record.systolic > 140 && "text-destructive font-medium"
                        )}>
                          {record.systolic}/{record.diastolic}
                        </span>
                      </TableCell>
                      <TableCell>{record.steps}</TableCell>
                      <TableCell>
                        {record.anomaly ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Anomaly
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-success border-success/30">
                            Normal
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
