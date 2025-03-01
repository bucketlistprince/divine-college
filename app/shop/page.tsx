import React from 'react';

const products = [
  {
    name: "College Hoodie",
    price: 39.99,
    category: "Apparel",
    description: "Comfortable cotton-blend hoodie with college logo"
  },
  {
    name: "College T-Shirt",
    price: 24.99,
    category: "Apparel",
    description: "Classic fit t-shirt with college emblem"
  },
  {
    name: "Study Bible",
    price: 34.99,
    category: "Books",
    description: "Comprehensive study bible with annotations"
  },
  {
    name: "Coffee Mug",
    price: 14.99,
    category: "Accessories",
    description: "Ceramic mug with college logo"
  },
  {
    name: "Notebook Set",
    price: 12.99,
    category: "Stationery",
    description: "Set of 3 college-branded notebooks"
  },
  {
    name: "Laptop Bag",
    price: 44.99,
    category: "Accessories",
    description: "Durable laptop bag with college emblem"
  }
];

export default function ShopPage() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">College Store</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {["All", "Apparel", "Books", "Accessories", "Stationery"].map((category) => (
                  <button
                    key={category}
                    className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Price Range</h2>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
              />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                      [Product Image]
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${product.price}</span>
                      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
