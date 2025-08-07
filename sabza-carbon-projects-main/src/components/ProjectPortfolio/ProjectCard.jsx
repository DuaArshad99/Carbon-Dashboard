"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Zap, Award, ExternalLink, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

export function ProjectCard({ project, onViewDetails }) {
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

  const handleViewCertificate = (project) => {
    const certificateUrl = `https://certificates.sabza.com/project/${project._id}`
    console.log(`Opening certificate for  ${project["Project Name"]}...`)
    window.open(certificateUrl, '_blank')
    setTimeout(() => {
      toast(`Certificate for  ${project["Project Name"]} opened successfully!`)
    }, 500)
  }

  const handleBuy = () => {
    toast.success("Purchase option coming soon!")
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img src={project.image || "/placeholder.svg"} alt= {project["Project Name"]} className="object-cover w-full h-full"  />
        <div className="absolute top-3 right-3">
          <Badge className={getTypeColor(project.Sector)}>{project.Sector}</Badge>
        </div>
      </div>

     <CardHeader className="pb-3">
  <div className="space-y-2">
    {/* Title + ID */}
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-semibold text-lg text-gray-900 leading-tight">{project["Project Name"]}</h3>
    </div>
    
    <Badge className="bg-blue-100 text-blue-900" variant="secondary">
        Id-{project.Id}
    </Badge>
    
    {/* CO₂ Price badge, always below title */}
    <div className="flex justify-end">
      <Badge className="bg-green-100 text-green-900 border border-green-300 px-2 py-1 text-sm font-semibold whitespace-nowrap">
        CO₂ Price ($/Tonne): ${project.Price}
      </Badge>
    </div>

    {/* Subtitle + Location */}
    <p className="text-sm text-gray-600">{project.Country}</p>
    <div className="flex items-center space-x-1 text-sm text-gray-500">
      <MapPin className="h-4 w-4" />
      <span>{project.Country}</span>
    </div>
  </div>
</CardHeader>


      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-600">Capacity:</span>
            </div>
            <span className="font-medium text-gray-600"> {project["Total Issued Units"]}</span>

            <div className="flex items-center space-x-1 text-gray-600">
              <Award className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">CO₂ Offset (Credits Available):</span>
            </div>
            <span className="font-medium text-gray-600">{project["Total Available Units"]} tCO₂e</span>

            
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-600">
              <span className="text-sm text-gray-600">Verifier:</span>
              <span className="text-sm font-medium">{project.Registry}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge className={getStatusColor(project["Project Status"])} variant="secondary">
                {project["Project Status"]}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 text-gray-600">
            <p className="text-sm text-gray-600">Co-benefits:</p>
            <div className="flex flex-wrap gap-1">
              {(project.coBenefits || []).map((benefit, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}

            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>
        </div>

        <div className="pt-4 mt-4 border-t space-y-2">
          <Button onClick={() => onViewDetails(project._id)} className="w-full text-green-600 hover:text-black">
            View Details
          </Button>
          <Button onClick={() => handleViewCertificate(project)} className="w-full flex items-center justify-center space-x-2 text-white bg-green-600 px-4 py-2 rounded">
            <ExternalLink className="h-4 w-4" />
            <span>View Certificate</span>
          </Button>
          <Button onClick={handleBuy} className="w-full flex items-center justify-center space-x-2 text-white bg-green-600 px-4 py-2 rounded">
            <ShoppingCart className="h-4 w-4" />
            <span>Buy</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
