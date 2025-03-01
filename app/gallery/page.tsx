import React from 'react';

const images = [
  {
    src: "/images/campus-1.jpg",
    alt: "Campus Main Building",
    caption: "Our Historic Main Building"
  },
  {
    src: "/images/library.jpg",
    alt: "College Library",
    caption: "Modern Library Facilities"
  },
  {
    src: "/images/chapel.jpg",
    alt: "College Chapel",
    caption: "Our Beautiful Chapel"
  },
  {
    src: "/images/students.jpg",
    alt: "Students in Class",
    caption: "Interactive Learning Environment"
  },
  {
    src: "/images/graduation.jpg",
    alt: "Graduation Ceremony",
    caption: "Graduation Day Celebrations"
  },
  {
    src: "/images/events.jpg",
    alt: "Campus Events",
    caption: "Community Events"
  }
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Photo Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              {/* Note: Replace with actual images when available */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-800">
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                  [Placeholder for {image.alt}]
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-sm font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Share Your Photos</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Are you a student or alumni? Share your campus memories with us!
          </p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
            Submit Photos
          </button>
        </div>
      </div>
    </main>
  );
}
