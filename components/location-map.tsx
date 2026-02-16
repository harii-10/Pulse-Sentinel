"use client"

import { MapPin, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LocationMapProps {
  location: { lat: number; lng: number } | null
}

export function LocationMap({ location }: LocationMapProps) {
  if (!location) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            Location Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-48 bg-muted/30 rounded-lg">
            <MapPin className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">GPS data not available</p>
            <p className="text-xs text-muted-foreground mt-1">
              Device may be indoors or GPS is disabled
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01}%2C${location.lat - 0.01}%2C${location.lng + 0.01}%2C${location.lat + 0.01}&layer=mapnik&marker=${location.lat}%2C${location.lng}`

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            Location Tracking
          </span>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Navigation className="h-4 w-4" />
              Open in Maps
            </a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 rounded-lg overflow-hidden border">
          <iframe
            title="Location Map"
            src={mapUrl}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
          <span className="flex items-center gap-1 text-success">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Live
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
