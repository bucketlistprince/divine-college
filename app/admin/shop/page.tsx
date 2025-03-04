import React from 'react';
import AdminLayout from '@/app/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ShopPage = () => {
  const products = [
    { id: 1, name: 'Product 1', shortDescription: 'Short description of product 1', price: 100 },
    { id: 2, name: 'Product 2', shortDescription: 'Short description of product 2', price: 200 },
    // ...more products
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8">Manage Shop</h1>
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="mb-4">
                <Label>Product Name</Label>
                <Input type="text" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Short Description</Label>
                <Input type="text" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Detailed Description</Label>
                <textarea className="w-full p-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <div className="mb-4">
                <Label>Price</Label>
                <Input type="number" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Product Images</Label>
                <Input type="file" className="w-full" multiple />
              </div>
              <Button type="submit" className="mt-4">Add Product</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Existing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 text-left">Product Name</th>
                  <th className="py-2 text-left">Short Description</th>
                  <th className="py-2 text-left">Price</th>
                  <th className="py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-t">
                    <td className="py-2">{product.name}</td>
                    <td className="py-2">{product.shortDescription}</td>
                    <td className="py-2">${product.price}</td>
                    <td className="py-2">
                      <Button>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ShopPage;
