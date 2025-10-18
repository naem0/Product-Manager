"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setProducts, setLoading, setError, setTotalPages } from "@/lib/redux/slices/products-slice"
import { setCategories } from "@/lib/redux/slices/categories-slice"
import { logout } from "@/lib/redux/slices/auth-slice"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductsHeader } from "@/components/products-header"
import { ProductsPagination } from "@/components/products-pagination"
import { CategoryFilter } from "@/components/category-filter"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { items, loading, error, currentPage, searchQuery, selectedCategoryId } = useAppSelector(
    (state) => state.products,
  )
  const { token } = useAppSelector((state) => state.auth)


  useEffect(() => {
    if (!token) return

const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setCategories(data));
          console.log("Fetched categories:", data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [token, dispatch]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const endpoint = searchQuery ? `${baseUrl}/products/search` : `${baseUrl}/products`;

        const params = new URLSearchParams({
          offset: ((currentPage - 1) * 12).toString(),
          limit: "12"
        });

        if (searchQuery) {
          params.append("searchedText", searchQuery);
        }

        if (selectedCategoryId) {
          params.append("categoryId", selectedCategoryId);
        }

        const response = await fetch(`${endpoint}?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response)

        if (!response.ok) {
          if (response.status === 401) {
            dispatch(logout())
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        dispatch(setProducts(data))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : "An error occurred"))
      }
    }

    fetchProducts()
  }, [token, currentPage, searchQuery, selectedCategoryId, dispatch, router])

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

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button onClick={() => router.push("/products/new")} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        </div>

        <CategoryFilter />

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : items?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No products found</p>
            <Button onClick={() => router.push("/products/new")}>
              <Plus className="mr-2 h-5 w-5" />
              Create your first product
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {items?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <ProductsPagination />
          </>
        )}
      </main>
    </div>
  )
}
