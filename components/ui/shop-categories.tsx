"use client"

import { ShoppingBag, Shirt, Book, Gift } from "lucide-react"
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 1,
    title: "All Items",
    icon: <ShoppingBag className="w-5 h-5" />,
    slug: 'all',
    image: '/image1.jpg',
    active: true
  },
  {
    id: 2,
    title: "Apparel",
    icon: <Shirt className="w-5 h-5" />,
    slug: 'apparel',
    image: '/image2.jpg',
    active: false
  },
  {
    id: 3,
    title: "Books",
    icon: <Book className="w-5 h-5" />,
    slug: 'books',
    image: '/image3.jpg',
    active: false
  },
  {
    id: 4,
    title: "Accessories",
    icon: <Gift className="w-5 h-5" />,
    slug: 'accessories',
    image: '/image4.jpg',
    active: false
  }
]

export function ShopCategories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.slug}`}
          className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              {category.icon}
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 p-4">
            <h3 className="text-lg font-semibold text-white">{category.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
