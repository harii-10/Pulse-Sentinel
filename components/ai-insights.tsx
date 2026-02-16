"use client"

import { Sparkles, Lightbulb, TrendingUp, Droplet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AIInsightsProps {
  insights: string[]
}

const insightIcons = [
  <Sparkles key="sparkles" className="h-4 w-4 text-primary" />,
  <Lightbulb key="lightbulb" className="h-4 w-4 text-warning" />,
  <TrendingUp key="trending" className="h-4 w-4 text-success" />,
  <Droplet key="droplet" className="h-4 w-4 text-primary" />,
]

export function AIInsightsCard({ insights }: AIInsightsProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          AI Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-background/60 backdrop-blur-sm"
            >
              <div className="mt-0.5">
                {insightIcons[index % insightIcons.length]}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
