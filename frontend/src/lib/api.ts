// API configuration and base functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  images: T[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface Image {
  _id: string;
  title: string;
  description: string;
  cloudinaryId: string;
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  tags: string[];
  category: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadImageData {
  title?: string;
  description?: string;
  tags?: string;
  category?: string;
  uploadedBy?: string;
}

// Base fetch function with error handling
const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete config.headers?.['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Image API functions
export const imageApi = {
  // Get all images with pagination and filters
  getImages: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<PaginatedResponse<Image>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);

    const query = searchParams.toString();
    return apiFetch<PaginatedResponse<Image>>(`/images${query ? `?${query}` : ''}`);
  },

  // Get single image by ID
  getImage: async (id: string): Promise<Image> => {
    return apiFetch<Image>(`/images/${id}`);
  },

  // Upload new image
  uploadImage: async (file: File, data: UploadImageData): Promise<Image> => {
    const formData = new FormData();
    formData.append('image', file);
    
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.tags) formData.append('tags', data.tags);
    if (data.category) formData.append('category', data.category);
    if (data.uploadedBy) formData.append('uploadedBy', data.uploadedBy);

    return apiFetch<Image>('/images', {
      method: 'POST',
      body: formData,
    });
  },

  // Update image metadata
  updateImage: async (id: string, data: Partial<UploadImageData>): Promise<Image> => {
    return apiFetch<Image>(`/images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete image
  deleteImage: async (id: string): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>(`/images/${id}`, {
      method: 'DELETE',
    });
  },

  // Search images
  searchImages: async (query: string, page = 1, limit = 10): Promise<PaginatedResponse<Image>> => {
    return apiFetch<PaginatedResponse<Image>>(`/images?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  },

  // Get images by category
  getImagesByCategory: async (category: string, page = 1, limit = 10): Promise<PaginatedResponse<Image>> => {
    return apiFetch<PaginatedResponse<Image>>(`/images?category=${encodeURIComponent(category)}&page=${page}&limit=${limit}`);
  },
};

export default imageApi;