import React from 'react';
import AdminLayout from '@/app/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdmissionsPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8">Manage Admissions</h1>
        <Card>
          <CardHeader>
            <CardTitle>Review Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="p-4 border border-gray-300 rounded-md">
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-gray-600">Applied for Fashion Design</p>
                <Button className="mt-2">Approve</Button>
              </li>
              <li className="p-4 border border-gray-300 rounded-md">
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-gray-600">Applied for Interior Design</p>
                <Button className="mt-2">Approve</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdmissionsPage;
