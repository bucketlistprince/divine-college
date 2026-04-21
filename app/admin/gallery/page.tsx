"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { GalleryForm } from "@/components/forms/gallery-form"
import { Plus, Trash2, Edit } from "lucide-react"

// Form data interface for creating/editing gallery items
interface GalleryFormData {
  title: string
  description: string
  category: GalleryCategory
  images: File[]
}

// Gallery item interface for displaying photos
interface GalleryItem {
  id: string
  title: string
  description: string
  category: GalleryCategory
  image: string
  uploadedBy: string
  uploadedAt: string
}

import { GALLERY_CATEGORIES, GalleryCategory } from "@/lib/constants"

const categories = GALLERY_CATEGORIES

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedView, setSelectedView] = useState<"grid" | "list">("grid")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (!response.ok) throw new Error('Failed to fetch photos')
      const data = await response.json()
      console.log('Fetched photos:', data)
      setPhotos(data)
    } catch (error) {
      console.error('Error fetching photos:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPhotos = photos.filter((photo) =>
    selectedCategory === "All" ? true : photo.category === selectedCategory
  )

  const handleAddPhoto = async (data: GalleryFormData) => {
    try {
      if (data.images.length === 0) {
        throw new Error('Please select at least one image to upload');
      }

      // Upload all images to Vercel Blob
      const uploadPromises = data.images.map(async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const uploadData = await uploadResponse.json();
        if (!uploadData.url) {
          throw new Error('No URL received from upload');
        }
        
        return uploadData.url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Create gallery entries for each image
      const createPromises = imageUrls.map(url => 
        fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            category: data.category,
            image: url,
            uploadedBy: "info@divinecollegeofarts.com", // This should come from auth
          })
        }).then(res => {
          if (!res.ok) throw new Error('Failed to create photo entry');
          return res.json();
        })
      );

      const newPhotos = await Promise.all(createPromises);
      console.log('Created new photos:', newPhotos);
      setPhotos(prev => [...newPhotos, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating photos:', error);
      throw error instanceof Error ? error : new Error('Failed to create photos');
    }
  }

  const handleEditPhoto = async (data: GalleryFormData) => {
    if (!editingPhoto) return;

    try {
      let imageUrl = editingPhoto.image;

      // If new images were selected, upload the first one
      if (data.images.length > 0) {
        const formData = new FormData();
        formData.append('file', data.images[0]);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) throw new Error('Failed to upload image');
        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const response = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingPhoto.id,
          title: data.title,
          description: data.description,
          category: data.category,
          image: imageUrl,
        })
      });

      if (!response.ok) throw new Error('Failed to update photo');
      const updatedPhoto = await response.json();
      setPhotos(photos.map(photo => 
        photo.id === editingPhoto.id ? updatedPhoto : photo
      ));
      setEditingPhoto(null);
    } catch (error) {
      console.error('Error updating photo:', error);
      throw error instanceof Error ? error : new Error('Failed to update photo');
    }
  }

  const handleDeletePhoto = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete photo')
      }
      
      setPhotos(photos.filter(photo => photo.id !== id))
    } catch (error) {
      console.error("Error deleting photo:", error)
      alert(error instanceof Error ? error.message : 'Failed to delete photo')
    }
  }

  // Convert GalleryItem to GalleryFormData for the form
  const getFormData = (item: GalleryItem): GalleryFormData => {
    return {
      title: item.title,
      description: item.description,
      category: item.category,
      images: []
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPhoto(null)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Gallery Management"
        description="Manage and organize the college photo gallery"
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
              <Button onClick={() => setIsModalOpen(true)} className="w-full xs:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-center">
              <Button
                variant={selectedView === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedView("grid")}
                className="flex-1 sm:flex-initial"
              >
                Grid
              </Button>
              <Button
                variant={selectedView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedView("list")}
                className="flex-1 sm:flex-initial"
              >
                List
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "All"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Photos Grid/List */}
          <div className={selectedView === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {photo.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{photo.category}</span>
                    <span>{new Date(photo.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="mr-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      setEditingPhoto(photo)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          title={editingPhoto ? "Edit Photo" : "Upload Photo"}
          isOpen={isModalOpen || !!editingPhoto}
          onClose={handleCloseModal}
        >
          <GalleryForm
            initialData={editingPhoto ? getFormData(editingPhoto) : undefined}
            onSubmit={editingPhoto ? handleEditPhoto : handleAddPhoto}
            onCancel={handleCloseModal}
          />
        </Modal>
      </main>
    </div>
  )
}
