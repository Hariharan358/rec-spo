import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { imageApi, Image, UploadImageData } from '@/lib/api';
import { toast } from 'sonner';

// Query keys
export const imageKeys = {
  all: ['images'] as const,
  lists: () => [...imageKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...imageKeys.lists(), filters] as const,
  details: () => [...imageKeys.all, 'detail'] as const,
  detail: (id: string) => [...imageKeys.details(), id] as const,
};

// Hook for fetching images with pagination and filters
export const useImages = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: imageKeys.list(params || {}),
    queryFn: () => imageApi.getImages(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching a single image
export const useImage = (id: string) => {
  return useQuery({
    queryKey: imageKeys.detail(id),
    queryFn: () => imageApi.getImage(id),
    enabled: !!id,
  });
};

// Hook for uploading images
export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, data }: { file: File; data: UploadImageData }) =>
      imageApi.uploadImage(file, data),
    onSuccess: (newImage) => {
      // Invalidate and refetch images list
      queryClient.invalidateQueries({ queryKey: imageKeys.lists() });
      toast.success('Image uploaded successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });
};

// Hook for updating image metadata
export const useUpdateImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UploadImageData> }) =>
      imageApi.updateImage(id, data),
    onSuccess: (updatedImage) => {
      // Update the specific image in cache
      queryClient.setQueryData(imageKeys.detail(updatedImage._id), updatedImage);
      // Invalidate lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: imageKeys.lists() });
      toast.success('Image updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });
};

// Hook for deleting images
export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => imageApi.deleteImage(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: imageKeys.detail(deletedId) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: imageKeys.lists() });
      toast.success('Image deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });
};

// Hook for searching images
export const useSearchImages = (query: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: imageKeys.list({ search: query, page, limit }),
    queryFn: () => imageApi.searchImages(query, page, limit),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

// Hook for getting images by category
export const useImagesByCategory = (category: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: imageKeys.list({ category, page, limit }),
    queryFn: () => imageApi.getImagesByCategory(category, page, limit),
    enabled: !!category,
  });
};