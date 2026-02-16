"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Edit2,
  Mail,
  Phone,
  Pill,
  Plus,
  Save,
  Share2,
  Stethoscope,
  Trash2,
  User,
  Users,
} from "lucide-react"
import { toast } from "sonner"
import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockUserProfile } from "@/lib/mock-data"
import type { EmergencyContact, MedicationReminder, UserProfile } from "@/lib/types"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)
  const [shareWithDoctor, setShareWithDoctor] = useState(true)
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({})
  const [newMedication, setNewMedication] = useState<Partial<MedicationReminder>>({})
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [medicationDialogOpen, setMedicationDialogOpen] = useState(false)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast.success("Profile updated successfully")
  }

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please fill in required fields")
      return
    }
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      name: newContact.name,
      relationship: newContact.relationship || "Other",
      phone: newContact.phone,
      email: newContact.email || "",
      isPrimary: profile.emergencyContacts.length === 0,
    }
    setProfile((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, contact],
    }))
    setEditedProfile((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, contact],
    }))
    setNewContact({})
    setContactDialogOpen(false)
    toast.success("Emergency contact added")
  }

  const removeContact = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((c) => c.id !== id),
    }))
    setEditedProfile((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((c) => c.id !== id),
    }))
    toast.success("Contact removed")
  }

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      toast.error("Please fill in required fields")
      return
    }
    const medication: MedicationReminder = {
      id: Date.now().toString(),
      name: newMedication.name,
      dosage: newMedication.dosage,
      times: newMedication.times || ["08:00"],
      notes: newMedication.notes,
    }
    setProfile((prev) => ({
      ...prev,
      medications: [...prev.medications, medication],
    }))
    setNewMedication({})
    setMedicationDialogOpen(false)
    toast.success("Medication reminder added")
  }

  const removeMedication = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      medications: prev.medications.filter((m) => m.id !== id),
    }))
    toast.success("Medication removed")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Profile" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Patient Info Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/patient-avatar.png" alt={profile.name} />
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {profile.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Age: {profile.age}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Patient ID: {profile.id}
                    </span>
                  </CardDescription>
                </div>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="gap-2"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={isEditing ? editedProfile.dateOfBirth : profile.dateOfBirth}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Medical History */}
            <div className="space-y-2">
              <Label>Medical History</Label>
              <div className="flex flex-wrap gap-2">
                {profile.medicalHistory.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {condition}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <Textarea
                  placeholder="Add medical conditions (one per line)"
                  className="mt-2"
                />
              )}
            </div>

            {/* Doctor Sharing */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Share2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Share Data with Doctor</p>
                  <p className="text-sm text-muted-foreground">
                    Allow your doctor to access health data remotely
                  </p>
                </div>
              </div>
              <Switch
                checked={shareWithDoctor}
                onCheckedChange={setShareWithDoctor}
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>
                  People to notify in case of emergencies
                </CardDescription>
              </div>
              <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Emergency Contact</DialogTitle>
                    <DialogDescription>
                      Add a new emergency contact for notifications
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        value={newContact.name || ""}
                        onChange={(e) =>
                          setNewContact({ ...newContact, name: e.target.value })
                        }
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-relationship">Relationship</Label>
                      <Select
                        value={newContact.relationship}
                        onValueChange={(v) =>
                          setNewContact({ ...newContact, relationship: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spouse">Spouse</SelectItem>
                          <SelectItem value="Son">Son</SelectItem>
                          <SelectItem value="Daughter">Daughter</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Caregiver">Caregiver</SelectItem>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone *</Label>
                      <Input
                        id="contact-phone"
                        value={newContact.phone || ""}
                        onChange={(e) =>
                          setNewContact({ ...newContact, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={newContact.email || ""}
                        onChange={(e) =>
                          setNewContact({ ...newContact, email: e.target.value })
                        }
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addContact}>Add Contact</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {contact.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{contact.name}</p>
                        {contact.isPrimary && (
                          <Badge variant="outline" className="text-xs">Primary</Badge>
                        )}
                        {contact.relationship === "Doctor" && (
                          <Stethoscope className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </span>
                        {contact.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeContact(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medication Reminders */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Medication Reminders
                </CardTitle>
                <CardDescription>
                  Set up reminders for daily medications
                </CardDescription>
              </div>
              <Dialog open={medicationDialogOpen} onOpenChange={setMedicationDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Medication
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Medication Reminder</DialogTitle>
                    <DialogDescription>
                      Set up a new medication reminder
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="med-name">Medication Name *</Label>
                      <Input
                        id="med-name"
                        value={newMedication.name || ""}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, name: e.target.value })
                        }
                        placeholder="Enter medication name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="med-dosage">Dosage *</Label>
                      <Input
                        id="med-dosage"
                        value={newMedication.dosage || ""}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, dosage: e.target.value })
                        }
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="med-time">Reminder Time</Label>
                      <Input
                        id="med-time"
                        type="time"
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            times: [e.target.value],
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="med-notes">Notes</Label>
                      <Textarea
                        id="med-notes"
                        value={newMedication.notes || ""}
                        onChange={(e) =>
                          setNewMedication({ ...newMedication, notes: e.target.value })
                        }
                        placeholder="Additional instructions"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setMedicationDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addMedication}>Add Medication</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile.medications.map((med) => (
                <div
                  key={med.id}
                  className="p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-muted-foreground">{med.dosage}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeMedication(med.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-2">
                      {med.times.map((time, i) => (
                        <Badge key={i} variant="secondary">{time}</Badge>
                      ))}
                    </div>
                  </div>
                  {med.notes && (
                    <p className="text-xs text-muted-foreground mt-2">{med.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
