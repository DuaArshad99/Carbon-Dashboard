"use client"

import { Leaf, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  return (
    // Make it sticky and on top of other content
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="p-1  rounded-lg">
              <div >
  <img
    src="/logo.png" // 🖼 Replace this path with your logo path
    alt="Logo"
    className="h-16 w-19 object-contain"
  />
</div>
            </div>
            <div>
              {/* <h1 className="text-[16px] lg:text-xl font-bold text-gray-900">SABZA</h1> */}
              <p className="text-xl font-bold text-gray-600">Carbon Project Marketplace</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            // make badge positioning relative to this button
            className="relative border-green-600 text-green-600 bg-white"
          >
            <Bell className="h-5 w-5" />
            {/* badge */}
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
          </Button>

          <Avatar className="bg-green-600 text-white rounded-lg" >
            <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
            <AvatarFallback>
              <User className="h-5 w-5 " />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
