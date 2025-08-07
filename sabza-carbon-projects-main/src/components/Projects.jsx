import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectPortfolio } from "./ProjectPortfolio";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center text-red-500">No projects found.</div>;
  }

  return <ProjectPortfolio projects={projects} />;
}
