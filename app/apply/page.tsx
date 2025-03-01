import React from 'react';

export default function ApplyPage() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Apply Now</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Application Form</h2>
              <form className="space-y-6">
                {/* Personal Information */}
                <section>
                  <h3 className="text-xl font-medium mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </section>
                
                {/* Academic Information */}
                <section>
                  <h3 className="text-xl font-medium mb-4">Academic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="program" className="block text-sm font-medium mb-1">
                        Desired Program
                      </label>
                      <select
                        id="program"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a program</option>
                        <option value="theology">Bachelor of Theology</option>
                        <option value="religious-ed">Religious Education</option>
                        <option value="ministry">Christian Ministry</option>
                        <option value="biblical-studies">Biblical Studies</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="startTerm" className="block text-sm font-medium mb-1">
                        Start Term
                      </label>
                      <select
                        id="startTerm"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a term</option>
                        <option value="fall-2025">Fall 2025</option>
                        <option value="spring-2026">Spring 2026</option>
                        <option value="fall-2026">Fall 2026</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium mb-1">
                        Previous Education
                      </label>
                      <textarea
                        id="education"
                        rows={3}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="List your previous education, including institutions and graduation dates"
                      />
                    </div>
                  </div>
                </section>
                
                {/* Additional Information */}
                <section>
                  <h3 className="text-xl font-medium mb-4">Additional Information</h3>
                  <div>
                    <label htmlFor="statement" className="block text-sm font-medium mb-1">
                      Personal Statement
                    </label>
                    <textarea
                      id="statement"
                      rows={5}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your calling to ministry and your goals"
                    />
                  </div>
                </section>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
          
          {/* Application Information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Application Requirements</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  High School Transcripts
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Two Letters of Recommendation
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Personal Statement
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Application Fee
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Important Dates</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">Fall 2025 Semester</h3>
                  <p className="text-gray-600">Application Deadline: June 1, 2025</p>
                </div>
                <div>
                  <h3 className="font-medium">Spring 2026 Semester</h3>
                  <p className="text-gray-600">Application Deadline: November 1, 2025</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="mb-4">
                Contact our admissions office for assistance with your application.
              </p>
              <div className="space-y-2">
                <p>Email: admissions@divinecollege.edu</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
