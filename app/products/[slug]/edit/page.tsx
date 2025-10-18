"use client"

import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { useRouter, useParams } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { ProductsHeader } from "@/components/products-header"
import { logout } from "@/lib/redux/slices/auth-slice"
import type { Product } from "@/lib/redux/slices/products-slice"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            dispatch(logout())
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch product")
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [token, params.id, dispatch, router])

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Product</h1>
          <p className="text-muted-foreground">Update product information</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : product ? (
          <ProductForm product={product} />
        ) : null}
      </main>
    </div>
  )
}
