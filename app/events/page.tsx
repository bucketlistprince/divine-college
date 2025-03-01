import React from 'react';

const events = [
  {
    title: "Annual Spiritual Retreat",
    date: "March 15-17, 2025",
    location: "Main Campus",
    description: "A three-day spiritual retreat focusing on personal growth and community building."
  },
  {
    title: "Academic Conference",
    date: "April 5, 2025",
    location: "Conference Hall",
    description: "International conference on modern theological perspectives."
  },
  {
    title: "Community Service Day",
    date: "April 20, 2025",
    location: "Various Locations",
    description: "Students and faculty engage in community service projects."
  },
  {
    title: "Graduation Ceremony",
    date: "June 15, 2025",
    location: "Main Auditorium",
    description: "Annual graduation ceremony celebrating our graduating class."
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
        
        <div className="grid gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Submit Your Event</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Have an event you'd like to organize? Submit your proposal for review.
          </p>
          <button className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition-colors">
            Submit Event Proposal
          </button>
        </div>
      </div>
    </main>
  );
}
