import React from 'react';
import AdminLayout from '@/app/admin-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="mb-4">
                <Label>Site Title</Label>
                <Input type="text" className="w-full" />
              </div>
              <div className="mb-4">
                <Label>Site Description</Label>
                <textarea className="w-full p-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <Button type="submit" className="mt-4">Save Settings</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
