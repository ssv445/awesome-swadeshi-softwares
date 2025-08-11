"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Flag, Upload, X, Plus, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { categories, tags } from "@/lib/data"
import type { Category, Tag } from "@/lib/types"

export default function SubmitSoftwarePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [alternatives, setAlternatives] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const addAlternative = (alternative: string) => {
    if (alternative.trim() && !alternatives.includes(alternative.trim())) {
      setAlternatives([...alternatives, alternative.trim()])
    }
  }

  const removeAlternative = (index: number) => {
    setAlternatives(alternatives.filter((_, i) => i !== index))
  }

  const addFeature = (feature: string) => {
    if (feature.trim() && !features.includes(feature.trim())) {
      setFeatures([...features, feature.trim()])
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const toggleTag = (tag: Tag) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for submitting your software to the Indian Software Directory. Our team will review your
              submission within 2-3 business days.
            </p>
            <div className="space-y-4">
              <Button asChild size="lg">
                <Link href="/">Return to Homepage</Link>
              </Button>
              <div>
                <Button asChild variant="outline">
                  <Link href="/submit">Submit Another Software</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Flag className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Indian Software Directory</h1>
                <p className="text-sm text-gray-600">Made in India, Made for the World</p>
              </div>
            </Link>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Indian Software</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help us grow the directory by submitting your favorite Indian software or your own product. Let's showcase
              the best of Indian innovation together.
            </p>
          </div>

          {/* Guidelines */}
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Submission Guidelines:</strong> Only software developed by Indian companies or individuals will be
              accepted. Please ensure all information is accurate and up-to-date. Our team will review your submission
              within 2-3 business days.
            </AlertDescription>
          </Alert>

          {/* Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>Software Information</CardTitle>
              <CardDescription>
                Please provide detailed information about the software you're submitting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Software Name *</Label>
                      <Input id="name" name="name" required placeholder="e.g., Zoho CRM" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input id="company" name="company" required placeholder="e.g., Zoho Corporation" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      name="shortDescription"
                      required
                      placeholder="Brief one-line description (max 100 characters)"
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      placeholder="Provide a comprehensive description of the software, its features, and benefits"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL *</Label>
                      <Input id="website" name="website" type="url" required placeholder="https://example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub URL (Optional)</Label>
                      <Input id="github" name="github" type="url" placeholder="https://github.com/company/project" />
                    </div>
                  </div>
                </div>

                {/* Category and Tags */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Category & Tags</h3>

                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      onValueChange={(value) => setSelectedCategory(categories.find((c) => c.id === value) || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags (Select all that apply)</Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={selectedTags.find((t) => t.id === tag.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alternatives */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Alternatives</h3>
                  <p className="text-sm text-gray-600">
                    List the international software that this Indian software can replace or serve as an alternative to.
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., Slack, Microsoft Teams, Discord"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addAlternative((e.target as HTMLInputElement).value)
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addAlternative(input.value)
                          input.value = ""
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {alternatives.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {alternatives.map((alt, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {alt}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeAlternative(index)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., Real-time messaging, Video calls, File sharing"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addFeature((e.target as HTMLInputElement).value)
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addFeature(input.value)
                          input.value = ""
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(index)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Company Details</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location in India *</Label>
                      <Input id="location" name="location" required placeholder="e.g., Bangalore, Karnataka" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founded">Founded Year</Label>
                      <Input id="founded" name="founded" type="number" min="1900" max="2024" placeholder="e.g., 2010" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pricing">Pricing Model *</Label>
                      <Select name="pricing">
                        <SelectTrigger>
                          <SelectValue placeholder="Select pricing model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Freemium">Freemium</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Open Source">Open Source</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employees">Company Size</Label>
                      <Select name="employees">
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-1000">201-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submitter Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="submitterName">Your Name *</Label>
                      <Input id="submitterName" name="submitterName" required placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="submitterEmail">Your Email *</Label>
                      <Input
                        id="submitterEmail"
                        name="submitterEmail"
                        type="email"
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="submitterRole">Your Role *</Label>
                    <Select name="submitterRole">
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="founder">Founder/Co-founder</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="user">User/Customer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      placeholder="Any additional information you'd like to share about the software"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I confirm that this software is developed by an Indian company or individual, and all information
                      provided is accurate. *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="guidelines" required />
                    <Label htmlFor="guidelines" className="text-sm">
                      I have read and agree to the{" "}
                      <Link href="/guidelines" className="text-orange-500 hover:underline">
                        submission guidelines
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="text-orange-500 hover:underline">
                        terms of service
                      </Link>
                      . *
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="min-w-32">
                    {isSubmitting ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Software
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
