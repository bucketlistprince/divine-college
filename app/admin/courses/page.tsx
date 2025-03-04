import React from 'react';
import AdminLayout from '@/app/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const CoursesPage = () => {
  const courses = [
    { id: 1, name: 'Fashion Design', description: 'Learn the art of fashion design from industry experts' },
    { id: 2, name: 'Interior Design', description: 'Transform spaces with innovative design solutions' },
    { id: 3, name: 'Textile Design', description: 'Master the craft of textile design and production' },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8">Manage Courses</h1>
        <Card>
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="mb-4">
                <Label>Course Name</Label>
                <Input type="text" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Short Description</Label>
                <Input type="text" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Long Description</Label>
                <textarea className="w-full p-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <div className="mb-4">
                <Label>Duration</Label>
                <Input type="text" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Level</Label>
                <Input type="text" className="w-full" />
              </div>
              <Button type="submit" className="mt-4">Add Course</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Existing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 text-left">Course Name</th>
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id} className="border-t">
                    <td className="py-2">{course.name}</td>
                    <td className="py-2">{course.description}</td>
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

export default CoursesPage;
