import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { ImageGallery } from '@/components/ImageGallery';
import { Upload, Images, Search } from 'lucide-react';

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadComplete = (imageId: string) => {
    // Switch to gallery tab and refresh
    setActiveTab('gallery');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Image Gallery</h1>
          <p className="text-gray-600">
            Upload, manage, and browse your image collection
          </p>
        </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Images className="h-4 w-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Images className="h-5 w-5" />
                Your Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageGallery key={refreshKey} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <ImageUpload onUploadComplete={handleUploadComplete} />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default Gallery;