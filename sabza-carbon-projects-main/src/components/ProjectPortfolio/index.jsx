import { ProjectGrid } from "./ProjectGrid"
export function ProjectPortfolio({ projects }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Double Counting Proof - Impact You're Supporting</h2>
        <p className="text-gray-600">Explore the verified carbon offset projects</p>
      </div>

      <ProjectGrid projects={projects} />
    </div>
  )
}
