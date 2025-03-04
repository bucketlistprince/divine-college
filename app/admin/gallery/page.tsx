import React from 'react';
import AdminLayout from '@/app/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const GalleryPage = () => {
  const images = [
    { id: 1, title: 'Image 1', url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
    { id: 2, title: 'Image 2', url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
    { id: 3, title: 'Image 3', url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' },
    // ...more images
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8">Manage Gallery</h1>
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="mb-4">
                <Label>Image Title</Label>
                <Input type="text" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Upload Image</Label>
                <Input type="file" className="w-full" />
              </div>
              <Button type="submit" className="mt-4">Upload</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Existing Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {images.map(image => (
                <div key={image.id} className="border border-gray-300 rounded-md p-2">
                  <img src={image.url} alt={image.title} className="w-full h-32 object-cover rounded-md" />
                  <h3 className="text-lg font-semibold mt-2">{image.title}</h3>
                  <Button className="mt-2">Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GalleryPage;
