import React from 'react';

const courses = [
  {
    title: "Bachelor of Theology",
    description: "A comprehensive study of theological principles and religious texts.",
    duration: "4 years",
    level: "Undergraduate"
  },
  {
    title: "Religious Education",
    description: "Prepare for a career in religious education and spiritual guidance.",
    duration: "4 years",
    level: "Undergraduate"
  },
  {
    title: "Christian Ministry",
    description: "Develop practical skills for church leadership and ministry.",
    duration: "4 years",
    level: "Undergraduate"
  },
  {
    title: "Biblical Studies",
    description: "In-depth analysis and interpretation of biblical texts.",
    duration: "4 years",
    level: "Undergraduate"
  }
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-3">{course.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Duration: {course.duration}</span>
                <span>Level: {course.level}</span>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Admission Requirements</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>High School Diploma or equivalent</li>
            <li>Letters of Recommendation</li>
            <li>Personal Statement</li>
            <li>Academic Transcripts</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
