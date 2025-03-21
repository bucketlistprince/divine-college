import React from 'react';
import { useRouter } from 'next/router';

const products = [
  {
    id: 1,
    name: "College Hoodie",
    price: 39.99,
    category: "Apparel",
    description: "Comfortable cotton-blend hoodie with college logo",
    details: "This hoodie is made from a comfortable cotton-blend fabric and features the college logo on the front. Available in various sizes."
  },
  {
    id: 2,
    name: "College T-Shirt",
    price: 24.99,
    category: "Apparel",
    description: "Classic fit t-shirt with college emblem",
    details: "This classic fit t-shirt is made from 100% cotton and features the college emblem on the chest. Available in various sizes."
  },
  {
    id: 3,
    name: "Study Bible",
    price: 34.99,
    category: "Books",
    description: "Comprehensive study bible with annotations",
    details: "This study bible includes comprehensive annotations and study guides to help you understand the scriptures better."
  },
  {
    id: 4,
    name: "Coffee Mug",
    price: 14.99,
    category: "Accessories",
    description: "Ceramic mug with college logo",
    details: "This ceramic mug features the college logo and is perfect for your morning coffee or tea."
  },
  {
    id: 5,
    name: "Notebook Set",
    price: 12.99,
    category: "Stationery",
    description: "Set of 3 college-branded notebooks",
    details: "This set includes 3 college-branded notebooks, perfect for taking notes in class or at home."
  },
  {
    id: 6,
    name: "Laptop Bag",
    price: 44.99,
    category: "Accessories",
    description: "Durable laptop bag with college emblem",
    details: "This durable laptop bag features the college emblem and has multiple compartments to keep your laptop and accessories organized."
  }
];

const ProductDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find((product) => product.id === parseInt(id as string));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{product.name}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                [Product Image]
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-lg mb-4">{product.details}</p>
            <p className="text-2xl font-bold mb-4">${product.price}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
