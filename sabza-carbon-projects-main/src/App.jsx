import { Header } from "./components/common/Header";
import { Projects } from "./components/Projects";
import useState from "react"
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-full mx-auto px-6 py-8 space-y-12">
        <Projects />
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-green-100 rounded">
                <div className="h-4 w-4 bg-green-600 rounded"></div>
              </div>
              <span className="text-sm text-gray-600">
                © 2025 SABZA Carbon projects.
              </span>
            </div>
            <div className="text-sm text-gray-500">ZICON CLOUD</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
