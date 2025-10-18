"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setSelectedCategoryId, setCurrentPage } from "@/lib/redux/slices/products-slice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function CategoryFilter() {
  const dispatch = useAppDispatch()
  const { items: categories } = useAppSelector((state) => state.categories)
  const { selectedCategoryId } = useAppSelector((state) => state.products)
  console.log("CategoryFilter selectedCategoryId:", selectedCategoryId)
  console.log("CategoryFilter categories:", categories)

  const handleCategorySelect = (categoryId: string | null) => {
    dispatch(setSelectedCategoryId(categoryId))
    dispatch(setCurrentPage(1))
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-sm font-medium text-foreground">Filter by Category:</h3>
        {selectedCategoryId && (
          <Button variant="ghost" size="sm" onClick={() => handleCategorySelect(null)} className="h-7 px-2">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          <Button
            variant={selectedCategoryId === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategorySelect(null)}
            className="shrink-0"
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategoryId === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect(category.id)}
              className="shrink-0"
            >
              {category.name}
              {selectedCategoryId === category.id && <Badge className="ml-2 h-4 px-1 text-xs">Active</Badge>}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
