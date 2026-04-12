const API_BASE_URL = "http://tradinghub.test/api";

export interface Pagination {
  total: number;
  limit: number;
  current_page: number;
  total_pages: number;
}

export interface Business {
  id: string;
  cname: string;
  cmobile: string;
  cemail: string;
  cwebsite: string;
  abn: string;
  acn: string;
  postcode: string;
  streetnumber: string;
  streetname: string;
  businesssuberb: string;
  state: string;
  category_name: string;
  b_cat_id: string;
  b_s_cat_id?: string;
  // Mock fields that might be missing in DB but needed by UI
  rating?: string;
  reviews?: string;
  description?: string;
  cmap?: string;
}

export interface Category {
  id: string;
  category_name: string;
}

export interface BusinessDetailsData {
  business: Business;
  sub_category: any;
  about: any;
  services: any[];
  clients: any[];
  gallery: any[];
  experts: any[];
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  pagination?: Pagination;
  message?: string;
}

export const fetchBusinesses = async ({ 
  search, 
  category_name, 
  location,
  page = 0 
}: { 
  search?: string, 
  category_name?: string, 
  location?: string,
  page?: number 
}) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category_name && category_name !== "All Categories") params.append("category_name", category_name);
  if (location) params.append("locationsearch", location);
  params.append("page", page.toString());
  
  const response = await fetch(`${API_BASE_URL}/businesses?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch businesses");
  }
  return response.json() as Promise<ApiResponse<Business[]>>;
};

export const fetchBusinessDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/businesses/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch business details");
  }
  return response.json() as Promise<ApiResponse<BusinessDetailsData>>;
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json() as Promise<ApiResponse<Category[]>>;
};

export const fetchSubCategories = async (categoryId: string) => {
  const response = await fetch(`${API_BASE_URL}/sub-categories?category_id=${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch sub-categories");
  }
  return response.json() as Promise<ApiResponse<any[]>>;
};


export const registerBusiness = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

export const fetchProducts = async ({ 
  page = 0, 
  search = "", 
  category = "" 
}: { 
  page?: number, 
  search?: string, 
  category?: string 
}) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (search) params.append("searching", search);
  if (category) params.append("category", category);

  const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json() as Promise<ApiResponse<any[]>>;
};

export const fetchJobs = async ({ 
  page = 0, 
  search = "" 
}: { 
  page?: number, 
  search?: string 
}) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (search) params.append("search", search);

  const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json() as Promise<ApiResponse<any[]>>;
};

export const fetchJobDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }
  return response.json() as Promise<ApiResponse<any>>;
};

export const fetchProductDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json() as Promise<ApiResponse<any>>;
};





