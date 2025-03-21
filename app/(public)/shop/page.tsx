import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/ui/page-header"
import { headers } from "next/headers"
import { ShopContent } from "./shop-content"

async function getProducts() {
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  
  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: "no-store"
  })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="bg-white">
      <Navigation />
      <PageHeader 
        title="College Store"
        description="Show your Divine College pride with our official merchandise"
      />
      <ShopContent products={products} />
    </div>
  )
}
