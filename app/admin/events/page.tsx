import React from 'react';
import AdminLayout from '@/app/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EventsPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8">Manage Events</h1>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="p-4 border border-gray-300 rounded-md">
                <h3 className="text-lg font-semibold">Fashion Show</h3>
                <p className="text-gray-600">Date: 25th December 2023</p>
                <Button className="mt-2">Edit</Button>
              </li>
              <li className="p-4 border border-gray-300 rounded-md">
                <h3 className="text-lg font-semibold">Interior Design Workshop</h3>
                <p className="text-gray-600">Date: 15th January 2024</p>
                <Button className="mt-2">Edit</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EventsPage;
