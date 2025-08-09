import { ProjectGrid } from "./ProjectGrid"
import { useState, useEffect } from "react"
import axios from "axios"
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ProjectPortfolio({ projects }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  // Effect to update filteredProjects when projects prop changes
  useEffect(() => {setFilteredProjects(projects)}, [projects])


  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, display all projects
      setFilteredProjects(projects);
      return;
    }
    try {
      alert(searchTerm)
      const response = await axios.get(`http://localhost:5000/api/projects/search`, {
        params: { query: searchTerm }
      })
      setFilteredProjects(response.data) 
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Double Counting Proof - Impact You're Supporting</h2>
        <p className="text-gray-600">Explore the verified carbon offset projects</p>
      </div>

      <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-gray-100 text-black placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-green-500"
                />
              </div>
              <Button variant="outline" onClick={handleSearch} className="bg-green-600 hover:bg-green-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
      
      {/* Always display filteredProjects */}
      <ProjectGrid projects={filteredProjects} />
    </div>
  )
}
