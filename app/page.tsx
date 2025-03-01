import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '../components/navigation';
import React from 'react';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Fashion Design"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Divine College of Creative Arts
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Empowering the next generation with creative arts and fashion education
            </p>
            <Link 
              href="/apply"
              className="inline-block px-8 py-4 text-lg bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Your Creative Journey
            </Link>
          </div>
        </section>

        {/* Featured Programs */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Featured Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Fashion Design',
                  description: 'Learn the art of fashion design from industry experts',
                  image: '/images/fashion-design.jpg'
                },
                {
                  title: 'Interior Design',
                  description: 'Transform spaces with innovative design solutions',
                  image: '/images/interior-design.jpg'
                },
                {
                  title: 'Textile Design',
                  description: 'Master the craft of textile design and production',
                  image: '/images/textile-design.jpg'
                }
              ].map((program, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Creative Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of creative professionals and start building your future in the arts.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
     
    </>
  );
}
