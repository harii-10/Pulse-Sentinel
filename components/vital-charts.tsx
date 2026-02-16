"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { HistoricalData } from "@/lib/types"

interface VitalChartsProps {
  data: HistoricalData[]
  timeRange: "24h" | "7d" | "30d"
}

const heartRateConfig = {
  heartRate: {
    label: "Heart Rate",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const spo2Config = {
  spo2: {
    label: "SpO2",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const bpConfig = {
  systolic: {
    label: "Systolic",
    color: "var(--chart-3)",
  },
  diastolic: {
    label: "Diastolic",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const stepsConfig = {
  steps: {
    label: "Steps",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function formatTime(timestamp: string, timeRange: "24h" | "7d" | "30d") {
  const date = new Date(timestamp)
  if (timeRange === "24h") {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

export function HeartRateChart({ data, timeRange }: VitalChartsProps) {
  const chartData = data.map((d) => ({
    time: formatTime(d.timestamp, timeRange),
    heartRate: d.heartRate,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Heart Rate</CardTitle>
        <CardDescription>BPM over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={heartRateConfig} className="h-[200px] w-full">
          <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              domain={[50, 130]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillHeartRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="heartRate"
              stroke="var(--chart-3)"
              strokeWidth={2}
              fill="url(#fillHeartRate)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function SpO2Chart({ data, timeRange }: VitalChartsProps) {
  const chartData = data.map((d) => ({
    time: formatTime(d.timestamp, timeRange),
    spo2: d.spo2,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Blood Oxygen (SpO2)</CardTitle>
        <CardDescription>Oxygen saturation percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={spo2Config} className="h-[200px] w-full">
          <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              domain={[85, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSpo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="spo2"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#fillSpo2)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function BloodPressureChart({ data, timeRange }: VitalChartsProps) {
  const chartData = data.map((d) => ({
    time: formatTime(d.timestamp, timeRange),
    systolic: d.systolic,
    diastolic: d.diastolic,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Blood Pressure</CardTitle>
        <CardDescription>Systolic and Diastolic (mmHg)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={bpConfig} className="h-[200px] w-full">
          <LineChart data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              domain={[60, 160]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function StepsChart({ data, timeRange }: VitalChartsProps) {
  const chartData = data.map((d) => ({
    time: formatTime(d.timestamp, timeRange),
    steps: d.steps,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Activity (Steps)</CardTitle>
        <CardDescription>Steps recorded over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={stepsConfig} className="h-[200px] w-full">
          <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSteps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="steps"
              stroke="var(--chart-2)"
              strokeWidth={2}
              fill="url(#fillSteps)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
