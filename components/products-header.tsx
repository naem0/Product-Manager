"use client"

import type React from "react"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setSearchQuery } from "@/lib/redux/slices/products-slice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, LogOut } from "lucide-react"
import { useState } from "react"

interface ProductsHeaderProps {
  onLogout: () => void
}

export function ProductsHeader({ onLogout }: ProductsHeaderProps) {
  const dispatch = useAppDispatch()
  const { searchQuery } = useAppSelector((state) => state.products)
  const { email } = useAppSelector((state) => state.auth)
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSearchQuery(localSearch))
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-xl font-bold text-foreground">Product Manager</h2>
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{email}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
