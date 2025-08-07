"use client"
import axios from "axios"
import { useState } from "react"
import { ProjectCard } from "./ProjectCard"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, FileText, Award, ExternalLink } from 'lucide-react'
import { toast } from "sonner"

export function ProjectGrid({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = async (projectId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
    const project = response.data;

    setSelectedProject(project);
    setIsModalOpen(true);
  } catch (error) {
    console.error("Error fetching project details:", error);
    toast.error("Failed to fetch project details");
  }
};

  const handleViewCertificate = (project) => {
    // Mock certificate viewing functionality
    const certificateUrl = `https://certificates.sabza.com/project/${project._id}`
    
    // Show loading state (you can add a toast notification here)
    console.log(`Opening certificate for${project["Project Name"]}...`)
    
    // Simulate opening certificate in new tab
    window.open(certificateUrl, '_blank')
    
    // Show success notification (mock)
    setTimeout(() => {
     toast(`Certificate for ${project["Project Name"]} opened successfully!`)
    }, 500)
  }

  const handleDownloadReport = (project) => {
    // Mock report download functionality
    const reportFileName = `${project["Project Name"].replace(/\s+/g, '-').toLowerCase()}-impact-report.pdf`
    
    // Show loading state
    console.log(`Downloading report for ${project["Project Name"]}...`)
    
    // Create mock download
    const link = document.createElement('a')
    link.href = '#' // In real app, this would be the actual PDF URL
    link.download = reportFileName
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Show success notification
    setTimeout(() => {
      toast(`Impact report for ${project["Project Name"]} downloaded successfully!`)
    }, 800)
  }

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "solar":
        return "bg-yellow-100 text-yellow-800"
      case "wind":
        return "bg-blue-100 text-blue-800"
      case "methane capture":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
      case "active":
        return "bg-green-100 text-green-800"
      case "corsia-eligible":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} onViewDetails={handleViewDetails} />
        ))}
      </div>

      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} className="w-full">
        <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>Project Details</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Project Image and Basic Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <img
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject["Project Name"]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2">
  <div className="flex flex-wrap items-center gap-2">
    <h2 className="text-2xl font-bold text-gray-900">{selectedProject["Project Name"]}</h2>
    <Badge className={getStatusColor(selectedProject["Project Status"])} variant="secondary">
      Id-{selectedProject.Id}
    </Badge>
  </div>
  <Badge className="bg-green-100 text-green-900 border border-green-300 px-2 py-1 text-sm font-semibold whitespace-nowrap">
    CO₂ Price ($/Tonne): ${selectedProject.Price}
  </Badge>
</div>

                      <p className="text-gray-600">{selectedProject.Country}</p>
                      
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedProject.Country}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className={getTypeColor(selectedProject.Sector)}>{selectedProject.Sector}</Badge>
                      <Badge className={getStatusColor(selectedProject["Project Status"])} variant="secondary">
                        {selectedProject["Project Status"]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Project Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">CO₂ Reduced</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{selectedProject.details?.co2Reduced || "N/A"}</p>

                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Vintage Year</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{selectedProject["Crediting Period Start"]}</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Methodology</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{selectedProject.Methodology}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedProject.details?.description || "N/A"}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Technical Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{selectedProject["Total Issued Units"]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Verifier:</span>
                          <span className="font-medium">{selectedProject.Registry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Offset (Credits Available):</span>
                          <span className="font-medium">{selectedProject[["Total Available Units"]]} tCO₂e</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Co-benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.coBenefits?.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
  <Button 
    variant="outline" 
    onClick={() => handleViewCertificate(selectedProject)}
    className="bg-green-700 flex items-center space-x-2 text-white border-green-500 hover:bg-green-500  hover:border-green-600 transition-colors"
  >
    <ExternalLink className="h-4 w-4" />
    <span>View Certificate</span>
  </Button>
  
  <Button  
    onClick={() => handleDownloadReport(selectedProject)}
    className="flex items-center space-x-2 text-white bg-green-600 hover:bg-green-700 transition-colors"
  >
    <FileText className="h-4 w-4" />
    <span>Download Report</span>
  </Button>

  <Button  
    onClick={() => toast.success("Purchase option coming soon!")}
    className="flex items-center space-x-2 text-white bg-green-600 hover:bg-green-700 transition-colors"
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/>
    </svg>
    <span>Buy</span>
  </Button>
</div>

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}