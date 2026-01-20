import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Eye, Download, Trash2, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { useImages, useDeleteImage } from '@/hooks/useImages';
import { Image } from '@/lib/api';
import { toast } from 'sonner';

interface ImageGalleryProps {
  category?: string;
  searchQuery?: string;
  onImageSelect?: (image: Image) => void;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  category,
  searchQuery,
  onImageSelect,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const { data, isLoading, error } = useImages({
    page: currentPage,
    limit: 12,
    category,
    search: localSearch,
  });

  const deleteMutation = useDeleteImage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDelete = async (imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteMutation.mutateAsync(imageId);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleDownload = (image: Image, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create download link
    const link = document.createElement('a');
    link.href = image.secureUrl;
    link.download = `${image.title}.${image.format}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download started');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading images: {error.message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search images..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {data.images.map((image) => (
              <Card
                key={image._id}
                className="group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedImage(image);
                  onImageSelect?.(image);
                }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.secureUrl}
                      alt={image.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(image);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => handleDownload(image, e)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => handleDelete(image._id, e)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold truncate mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {image.description || 'No description'}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {image.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {image.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{image.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{image.category}</span>
                      <span>{formatFileSize(image.bytes)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {data.totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(data.totalPages, prev + 1))}
                disabled={currentPage === data.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* No Results */}
          {data.images.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No images found</p>
              {localSearch && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setLocalSearch('');
                    setCurrentPage(1);
                  }}
                  className="mt-2"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedImage.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <img
                  src={selectedImage.secureUrl}
                  alt={selectedImage.title}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Description:</strong>
                    <p className="mt-1">{selectedImage.description || 'No description'}</p>
                  </div>
                  
                  <div>
                    <strong>Details:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>Category: {selectedImage.category}</li>
                      <li>Format: {selectedImage.format.toUpperCase()}</li>
                      <li>Size: {selectedImage.width} × {selectedImage.height}</li>
                      <li>File Size: {formatFileSize(selectedImage.bytes)}</li>
                      <li>Uploaded: {new Date(selectedImage.createdAt).toLocaleDateString()}</li>
                    </ul>
                  </div>
                </div>
                
                {selectedImage.tags.length > 0 && (
                  <div>
                    <strong>Tags:</strong>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedImage.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={(e) => handleDownload(selectedImage, e)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      handleDelete(selectedImage._id, e);
                      setSelectedImage(null);
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};