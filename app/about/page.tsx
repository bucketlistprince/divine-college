import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                Divine College is dedicated to providing exceptional education that nurtures intellectual growth,
                fosters spiritual development, and prepares students for leadership in a global society.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p>
                To be a leading institution of higher learning, recognized for academic excellence,
                spiritual formation, and commitment to producing graduates who make positive contributions to society.
              </p>
            </section>
          </div>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Academic Excellence</li>
                <li>Spiritual Growth</li>
                <li>Community Service</li>
                <li>Integrity and Ethics</li>
                <li>Cultural Diversity</li>
                <li>Innovation and Creativity</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our History</h2>
              <p>
                Founded with a vision to provide quality education rooted in spiritual values,
                Divine College has grown to become a respected institution with a rich heritage
                of academic excellence and community engagement.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
