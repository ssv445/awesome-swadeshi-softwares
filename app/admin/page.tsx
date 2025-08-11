"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Shield,
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Building,
  Star,
} from "lucide-react"
import Link from "next/link"
import { featuredSoftware, stats } from "@/lib/data"
import type { Submission } from "@/lib/types"

// Mock submissions data
const mockSubmissions: Submission[] = [
  {
    id: "1",
    software: {
      name: "IndiaMart Connect",
      description: "B2B marketplace platform connecting Indian manufacturers with global buyers",
      shortDescription: "B2B marketplace for Indian manufacturers",
      website: "https://indiamart.com",
      logo: "/placeholder.svg?height=48&width=48",
      screenshots: [],
      category: {
        id: "3",
        name: "Business & Productivity",
        slug: "business",
        description: "",
        icon: "",
        color: "",
        softwareCount: 0,
      },
      tags: [],
      alternatives: ["Alibaba", "Amazon Business"],
      features: ["B2B Marketplace", "Lead Generation", "Supplier Directory"],
      pricing: "Freemium",
      company: "IndiaMART InterMESH Ltd",
      location: "Noida, Uttar Pradesh",
      founded: "1996",
      verified: false,
      featured: false,
      rating: 0,
      reviews: 0,
    },
    submitterName: "Rajesh Kumar",
    submitterEmail: "rajesh@indiamart.com",
    submitterRole: "employee",
    additionalNotes: "This is one of India's largest B2B platforms",
    status: "pending",
    submittedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    software: {
      name: "Ola Maps",
      description: "Indian mapping and navigation service with local insights",
      shortDescription: "Indian mapping and navigation platform",
      website: "https://maps.olakabs.com",
      logo: "/placeholder.svg?height=48&width=48",
      screenshots: [],
      category: {
        id: "2",
        name: "Development Tools",
        slug: "development",
        description: "",
        icon: "",
        color: "",
        softwareCount: 0,
      },
      tags: [],
      alternatives: ["Google Maps", "Apple Maps"],
      features: ["Navigation", "Local Business Listings", "Traffic Updates"],
      pricing: "Free",
      company: "ANI Technologies Pvt Ltd",
      location: "Bangalore, Karnataka",
      founded: "2010",
      verified: false,
      featured: false,
      rating: 0,
      reviews: 0,
    },
    submitterName: "Priya Sharma",
    submitterEmail: "priya@ola.com",
    submitterRole: "founder",
    status: "approved",
    submittedAt: new Date("2024-01-18"),
    reviewedAt: new Date("2024-01-19"),
    reviewedBy: "admin",
  },
]

export default function AdminDashboard() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions)

  const handleApprove = (submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? { ...sub, status: "approved" as const, reviewedAt: new Date(), reviewedBy: "admin" }
          : sub,
      ),
    )
  }

  const handleReject = (submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? { ...sub, status: "rejected" as const, reviewedAt: new Date(), reviewedBy: "admin" }
          : sub,
      ),
    )
  }

  const pendingSubmissions = submissions.filter((s) => s.status === "pending")
  const approvedSubmissions = submissions.filter((s) => s.status === "approved")
  const rejectedSubmissions = submissions.filter((s) => s.status === "rejected")

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Indian Software Directory</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                View Site
              </Link>
              <Button variant="outline">Logout</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Software</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSoftware}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSubmissions.length}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCompanies}</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(stats.totalDownloads / 1000000)}M+</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Software Submissions</CardTitle>
                    <CardDescription>Review and manage software submissions from users</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search submissions..." className="pl-10 w-64" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-32">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Software</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Submitter</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Building className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium">{submission.software.name}</div>
                              <div className="text-sm text-gray-600">{submission.software.shortDescription}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{submission.software.company}</div>
                            <div className="text-sm text-gray-600">{submission.software.location}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{submission.submitterName}</div>
                            <div className="text-sm text-gray-600">{submission.submitterRole}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              submission.status === "approved"
                                ? "default"
                                : submission.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {submission.submittedAt.toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{submission.software.name}</DialogTitle>
                                  <DialogDescription>Review submission details</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Software Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Company:</span> {submission.software.company}
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Location:</span> {submission.software.location}
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Website:</span>{" "}
                                        <Link
                                          href={submission.software.website}
                                          className="text-blue-500 hover:underline"
                                          target="_blank"
                                        >
                                          {submission.software.website}
                                        </Link>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Pricing:</span> {submission.software.pricing}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Description</h4>
                                    <p className="text-sm text-gray-700">{submission.software.description}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Alternatives</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {submission.software.alternatives.map((alt, index) => (
                                        <Badge key={index} variant="outline">
                                          {alt}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Submitter Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-gray-600">Name:</span> {submission.submitterName}
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Email:</span> {submission.submitterEmail}
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Role:</span> {submission.submitterRole}
                                      </div>
                                    </div>
                                    {submission.additionalNotes && (
                                      <div className="mt-2">
                                        <span className="text-gray-600">Notes:</span>
                                        <p className="text-sm mt-1">{submission.additionalNotes}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <DialogFooter>
                                  {submission.status === "pending" && (
                                    <div className="flex space-x-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => handleReject(submission.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                      <Button onClick={() => handleApprove(submission.id)}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                    </div>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            {submission.status === "pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleApprove(submission.id)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReject(submission.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="software">
            <Card>
              <CardHeader>
                <CardTitle>Manage Software</CardTitle>
                <CardDescription>View and manage all approved software in the directory</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Software</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featuredSoftware.map((software) => (
                      <TableRow key={software.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Building className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium">{software.name}</div>
                              <div className="text-sm text-gray-600">{software.shortDescription}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{software.company}</div>
                            <div className="text-sm text-gray-600">{software.location}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{software.category.name}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {software.rating}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {software.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                            {software.featured && <Badge className="bg-blue-100 text-blue-800">Featured</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-medium">24 submissions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-medium">18 submissions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Approval Rate</span>
                      <span className="font-medium text-green-600">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Business & Productivity</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Development Tools</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Communication</span>
                      <span className="font-medium">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Manage general site configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Site Title</label>
                    <Input defaultValue="Indian Software Directory" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Site Description</label>
                    <Input defaultValue="Discover the best Indian software alternatives" />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Moderation Settings</CardTitle>
                  <CardDescription>Configure content moderation rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Auto-approve verified companies</label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Require manual review for</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All submissions</SelectItem>
                        <SelectItem value="new-companies">New companies only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
