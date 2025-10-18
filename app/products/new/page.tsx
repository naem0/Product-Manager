"use client"

import { useEffect } from "react"
import { useAppSelector } from "@/lib/redux/hooks"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { ProductsHeader } from "@/components/products-header"
import { logout } from "@/lib/redux/slices/auth-slice"
import { useAppDispatch } from "@/lib/redux/hooks"

export default function NewProductPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  if (!token) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductsHeader onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Product</h1>
          <p className="text-muted-foreground">Add a new product to your catalog</p>
        </div>
        <ProductForm />
      </main>
    </div>
  )
}
